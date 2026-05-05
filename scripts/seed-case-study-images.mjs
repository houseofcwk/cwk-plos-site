#!/usr/bin/env node
// Uploads case-study cover images (and optional thumbnails) from
// public/images/case-studies/<slug>/ into Sanity, then patches each
// caseStudy doc to reference the uploaded asset.
//
// Idempotent: skips upload if the doc already has a cardImage asset
// reference (re-runs are safe).
//
// Usage:
//   SANITY_WRITE_TOKEN=sk... node scripts/seed-case-study-images.mjs            # dry run
//   SANITY_WRITE_TOKEN=sk... node scripts/seed-case-study-images.mjs --apply    # write

import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID ?? '3fsa3jok';
const DATASET = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const APPLY = process.argv.includes('--apply');

if (APPLY && !TOKEN) {
  console.error('SANITY_WRITE_TOKEN required for --apply.');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-10-01',
  token: TOKEN,
  useCdn: false,
});

// (slug, cardImage path, alt text, optional cardThumbnail path)
// Mirrors src/data/caseStudies.ts. Two studies (agent-plus, brand-destination)
// have no static cover image; they're skipped here and continue to render
// from their hardcoded mock cards.
const ENTRIES = [
  {
    slug: 'spraycation',
    cardImage: '/images/case-studies/spraycation/gallery-03.webp',
    cardImageAlt: 'Zuzu standing in front of the You Are Magic SPRAYCATION mural',
  },
  {
    slug: 'dawa',
    cardImage: '/images/case-studies/dawa/cover.webp',
    cardImageAlt: 'DAWA Diversity Awareness & Wellness in Action',
    cardThumbnail: '/images/case-studies/dawa/card.webp',
  },
  {
    slug: 'stephy-lee',
    cardImage: '/images/case-studies/stephy-lee/sxsw-2024.webp',
    cardImageAlt: "Stephy Lee — official SXSW 2024 artist, on stage at Stubb's, Austin",
  },
  {
    slug: 'lifes-tapestry',
    cardImage: '/images/case-studies/lifes-tapestry/hero-01.webp',
    cardImageAlt: "Titi Lee with Kris in front of CWK Consulting screen, sharing thanks for Life's Tapestry",
    cardThumbnail: '/images/case-studies/lifes-tapestry/card.webp',
  },
  {
    slug: 'pay-the-creators',
    cardImage: '/images/case-studies/pay-the-creators/gallery-01.webp',
    cardImageAlt: 'Pay the Creators Podcast team on set in the studio',
  },
  {
    slug: 'rob-dial',
    cardImage: '/images/case-studies/rob-dial/hero-01.webp',
    cardImageAlt: 'Rob Dial — The Mindset Mentor podcast portrait',
  },
  {
    slug: 'the-lab-miami',
    cardImage: '/images/case-studies/the-lab-miami/hero-01.webp',
    cardImageAlt: 'The LAB Miami innovation campus',
  },
  {
    slug: 'raasin-in-the-sun',
    cardImage: '/images/case-studies/raasin-in-the-sun/cover.webp',
    cardImageAlt: 'Raasin McIntosh in a TV studio interview during a Raasin in the Sun production',
  },
];

console.log(`\nPlan: ${ENTRIES.length} case studies. ${APPLY ? 'WRITING.' : 'DRY RUN.'}`);
for (const e of ENTRIES) {
  console.log(`  caseStudy-${e.slug}`);
  console.log(`    cardImage:     ${e.cardImage}`);
  if (e.cardThumbnail) console.log(`    cardThumbnail: ${e.cardThumbnail}`);
}

if (!APPLY) {
  console.log('\nDRY RUN. Re-run with --apply.\n');
  process.exit(0);
}

console.log();

async function uploadIfNew(currentRef, relPath, label) {
  // Skip if doc already has an asset ref for this field
  if (currentRef) {
    return { ref: currentRef, skipped: true };
  }
  const abs = resolve(REPO_ROOT, 'public' + relPath);
  const buf = readFileSync(abs);
  const filename = basename(abs);
  const asset = await client.assets.upload('image', buf, {
    filename,
    contentType: 'image/webp',
  });
  return { ref: asset._id, skipped: false, sizeKb: Math.round(buf.length / 1024) };
}

let ok = 0;
let failed = 0;

for (const e of ENTRIES) {
  const docId = `caseStudy-${e.slug}`;
  try {
    const existing = await client.getDocument(docId);
    if (!existing) {
      console.log(`✗ ${docId}: doc not found, skipping`);
      failed++;
      continue;
    }

    const cardRef = existing.cardImage?.asset?._ref;
    const thumbRef = existing.cardThumbnail?.asset?._ref;

    const cardResult = await uploadIfNew(cardRef, e.cardImage, 'cardImage');
    const thumbResult = e.cardThumbnail
      ? await uploadIfNew(thumbRef, e.cardThumbnail, 'cardThumbnail')
      : null;

    const patch = {};
    patch.cardImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: cardResult.ref },
      alt: e.cardImageAlt,
    };
    if (thumbResult) {
      patch.cardThumbnail = {
        _type: 'image',
        asset: { _type: 'reference', _ref: thumbResult.ref },
      };
    }

    await client.patch(docId).set(patch).commit();

    const cardTag = cardResult.skipped ? 'reused' : `uploaded ${cardResult.sizeKb}KB`;
    const thumbTag = thumbResult
      ? thumbResult.skipped
        ? ' + thumb reused'
        : ` + thumb uploaded ${thumbResult.sizeKb}KB`
      : '';
    console.log(`✓ ${docId} (cover ${cardTag}${thumbTag})`);
    ok++;
  } catch (err) {
    console.error(`✗ ${docId}: ${err?.message ?? err}`);
    failed++;
  }
}

console.log(`\nDone. ${ok} ok, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
