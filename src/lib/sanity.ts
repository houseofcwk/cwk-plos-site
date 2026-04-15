import { createClient } from '@sanity/client';
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';

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
