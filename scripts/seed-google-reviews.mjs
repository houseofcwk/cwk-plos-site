#!/usr/bin/env node
// Adds curated Google reviews to homePage.googleReviews. Idempotent: a single
// patch.set() call replaces the array, so re-runs are safe. Profile photos
// intentionally omitted; the section falls back to author initials.
//
// Usage:
//   SANITY_WRITE_TOKEN=sk... node scripts/seed-google-reviews.mjs            # dry run
//   SANITY_WRITE_TOKEN=sk... node scripts/seed-google-reviews.mjs --apply    # write

import { createClient } from '@sanity/client';

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

// Reviews verbatim from the public Google Maps page for CWK. Experience.
// Order is the display order; the section grid shows the first 6.
// Em dashes and emojis preserved when present in customers' own words (CWK-24
// rule applies to CWK copy, not third-party quotes).
const REVIEWS = [
  {
    key: 'shannon-hernandez',
    author: 'Shannon Hernandez',
    rating: 5,
    relativeTime: 'a month ago',
    text: `Loved every minute I got to spend with Kris in a 1:1 session with her to flesh out a new way to bring my community together and deepen relationships with them (and them with each other). Her session called The Offer Kitchen was so valuable - she has a process for how she helps you think about each offer and insight on how to position it in a way that feels on-brand and in alignment with your values. Thank you Kris for your help and insight!`,
  },
  {
    key: 'nam-nguyen',
    author: 'Nam Nguyen',
    rating: 5,
    relativeTime: '8 months ago',
    text: `I just went through Kris's CWK's Power Up Workshop and loved every single moment of it.

The way Kris brought clarity to my situation as a freelance content creator and communicated it in a human and intuitive way was an amazing experience. She not only clarified my situation but also expertly provided clear, actionable steps to power me up as a creator. This helps escape the common freelancer struggles: long nights, burnout, difficult clients, and not getting paid fairly for the value we bring to the table.

I 100% recommend this to anyone who wants clear, defined action steps to 10x themselves and their business in a short amount of time.`,
  },
  {
    key: 'una-singh',
    author: 'Una Singh',
    rating: 5,
    relativeTime: '9 months ago',
    text: `I just went through a Brand in a Box experience with Kris and it was such a treat.

The devotion, attention to detail, clarity -- it was all on point and this was one of the experiences that reshaped me and my business. There were revelations, discoveries, laughter, tears of remembrance and joy... I didn't expect the branding and positioning process to be so emotional!

But that's how I knew it was aligned.

Thank you Kris from the bottom of my heart. I'll come back to BIAB for many times for sure, but thank you for helping me come back to my truth.`,
  },
  {
    key: 'tammy-bowser',
    author: 'Tammy Bowser',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Brand building is a team sport and the CWK team knows how to play the game. As the founder of Sip Solo a CPG brand, it can be difficult to decide where the focus needs to be to grow the business. The CWK team helped guide me in the right direction for my brand, which has lead to increased sales, data driven decision and brand collaborations. I love having a team that is cheering me and my brand on. Thank you!

Tammy,
Founder of Sip Solo`,
  },
  {
    key: 'yasmina-benslimane',
    author: 'Yasmina Benslimane',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Kris's workshop was among the best 2 hours I've spent this year. A true wealth of knowledge, blending a holistic approach with concrete, actionable practices that help you optimize not only your work but also your well-being.

As someone looking to monetize my platform and align my goals with my values, this experience felt incredibly empowering. Kris's ability to deliver insights that are both authentic and deeply meaningful is unmatched. I walked away with systems and strategies that are easy to implement and designed for sustainable growth.

If you're considering ways to energize your work and unlock your potential, I wholeheartedly recommend her workshop. It's a game-changer!`,
  },
  {
    key: 'jay-scott',
    author: 'Jay Scott',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Working with CWK has been phenomenal! From our very first session, I gained incredible clarity about my brand and how it shapes everything - from my service offerings to how I communicate with clients. When I felt completely directionless, CWK helped get the ball rolling with practical strategies and clear guidance. Their ability to cut through the confusion and create actionable direction is remarkable. I would highly recommend CWK to anyone looking to develop or refine their brand strategy.`,
  },
  {
    key: 'terre-holmes',
    author: 'Terré Holmes',
    rating: 5,
    relativeTime: 'a year ago',
    text: `CWK Consulting was able to help me gain even greater clarity as I was trying to streamline my course, events, services and products in my business.

After just one hour, I was able to see what I needed to trim in my business and where my attention needed to go next. Ultimately saving me time, money and further frustration.

Kris San is the visionary behind the agency and her experience in branding is what drives the results the company is able to get for its clients.

I hands down recommend CWK to businesses of all sizes that are looking to gain greater brand clarity in an effort to communicate their message, mission and vision better and to preserve their bottom line.`,
  },
  {
    key: 'bonnie-tilley',
    author: 'Bonnie Tilley',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Working with Kris San at CWK Consulting was an absolute pleasure. At my former company, I was tasked with reviving a podcast project that had been sitting dormant—despite all the amazing footage and edits Kris had previously completed. From our very first conversation, Kris was enthusiastic, collaborative, and solution-oriented. She immediately agreed to rejoin the project and wrap up the final episodes within a budget we both felt good about.

Kris showed up early to set, came thoroughly prepared, and even went above and beyond by renting additional gear that elevated the production—without being asked. Not only did she shoot and edit the remaining episodes seamlessly, but she also took the initiative to connect with the former Marketing team to ensure everything aligned with the brand's voice and vision.

Her professionalism, creativity, and commitment to excellence truly stood out. I highly recommend CWK Consulting for any branding or creative needs—Kris is a true partner you can count on to bring your ideas to life!`,
  },
  {
    key: 'jared-montz',
    author: 'Jared Montz',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Usually I'm the one hearing, "I feel so understood" when I'm talking with a person in a business setting.

This time, it was me saying, " I feel so understood" to Kris!

I'm grateful for how much she cares, speaks the truth and the fast impact she is having on my mindset, my brand and my present and future.

Thank you Kris and CWK!`,
  },
  {
    key: 'jean-bermudez',
    author: 'Jean Bermudez',
    rating: 5,
    relativeTime: 'a year ago',
    text: `Kris, Brand in a Box is spectacular! Thank you for helping me to be aware of my brand and to establish its foundations. Sage was effective in helping me define what I do, identify my customers and how to establish a connection with them. Most of all thank you for motivating me to get off my butt 😆 ...`,
  },
  {
    key: 'niz',
    author: 'Niz',
    rating: 5,
    relativeTime: 'a year ago',
    text: `I had the awesome opportunity of meeting with Kris for a consultation and then trying her Brand in a Box platform to upscale my business.

What a game changer! The platform was the perfect beginning to organize and restructure my business and dial in key aspects of my business goals and purpose.

I highly recommend if you are looking to build a sustainable foundation for your brand and business.`,
  },
  {
    key: 'julie-mcmanus',
    author: 'Julie McManus',
    rating: 5,
    relativeTime: '10 months ago',
    text: `I highly recommend Kris and the CWK Consulting Team. We had a two hour call and I received incredible clarity about my business and what makes me tick. Thanks Kris for helping me to see my light!`,
  },
  {
    key: 'whitney-marty',
    author: 'Whitney Marty',
    rating: 5,
    relativeTime: 'a year ago',
    text: `I just got off a personal branding webinar with Kris and it was an hour well worth it. She shared her experience and impactful insights with passion and efficiency. When you're ready to show up for yourself and your business/product/gifts... contact her to explore the big picture, design the plan and take actionable steps. You'll be grateful you did.`,
  },
  {
    key: 'convert-ai-timmy',
    author: 'Convert AI (Timmy)',
    rating: 5,
    relativeTime: '11 months ago',
    text: `This workshop was awesome! I've done a lot of self-reflection and got a lot of growth from this, but Kris has a smooth way of elegantly busting barriers I didnt even see; great work! These steps have already unlocked some valuable things for me. - Timmy`,
  },
];

const AGGREGATE_RATING = 5;
// Visible reviews count. Update if the GBP total is higher.
const TOTAL_COUNT = REVIEWS.length;

const reviewItems = REVIEWS.map((r) => ({
  _key: `review-${r.key}`,
  _type: 'googleReview',
  author: r.author,
  rating: r.rating,
  relativeTime: r.relativeTime,
  text: r.text,
}));

console.log(`\nPlan: write ${REVIEWS.length} reviews to homePage.googleReviews`);
console.log(`  aggregateRating: ${AGGREGATE_RATING}`);
console.log(`  totalCount:      ${TOTAL_COUNT}`);
for (const r of REVIEWS) {
  console.log(`  • ${r.author.padEnd(22)} ${r.rating}★  ${r.relativeTime}`);
}

if (!APPLY) {
  console.log('\nDRY RUN. Re-run with --apply.\n');
  process.exit(0);
}

console.log('\nWriting...');
try {
  await client
    .patch('homePage')
    .set({
      googleReviews: reviewItems,
      googleReviewsAggregateRating: AGGREGATE_RATING,
      googleReviewsTotalCount: TOTAL_COUNT,
    })
    .commit();
  console.log('✓ homePage updated.');
} catch (err) {
  console.error(`✗ ${err?.message ?? err}`);
  process.exit(1);
}
