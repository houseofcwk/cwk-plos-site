import { createClient } from '@sanity/client';
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { SITE_SETTINGS_QUERY } from './queries';

export const SANITY_PROJECT_ID =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '3fsa3jok';
export const SANITY_DATASET =
  import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
export const SANITY_API_VERSION = '2024-10-01';

export const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset:   SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (src: SanityImageSource) => builder.image(src);

// Build-time memoized fetch for siteSettings. Every page render goes through
// Base.astro, which needs siteSettings for SEO + JSON-LD + footer. Caching at
// the module level means the static build hits Sanity once total, not once
// per page. Returns null on any failure so callers can fall back to hardcoded
// defaults; never throws, so a Sanity outage cannot break the build.
let siteSettingsCache: unknown | null | undefined;
export async function getSiteSettings(): Promise<any | null> {
  if (siteSettingsCache !== undefined) return siteSettingsCache as any;
  try {
    siteSettingsCache = await sanity.fetch(SITE_SETTINGS_QUERY);
  } catch {
    siteSettingsCache = null;
  }
  return siteSettingsCache as any;
}
