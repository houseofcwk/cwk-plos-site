// Helper that turns a Sanity `seo` object (or null/undefined) into the props
// expected by Base.astro. All fields default to null so Base/SEO can apply
// their own fallbacks. Crash-safe by design — pass in any junk, get back a
// well-shaped object.

export interface SeoLike {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  ogType?: string | null;
  twitterCard?: string | null;
  robots?: string | null;
  ogImage?: { alt?: string | null; asset?: { url?: string | null } | null } | null;
}

export interface SeoBaseProps {
  ogImage: string | null;
  ogImageAlt: string | null;
  canonical: string | null;
  ogType: string | null;
  twitterCard: string | null;
  robots: string | null;
}

export function seoBaseProps(seo: SeoLike | null | undefined): SeoBaseProps {
  return {
    ogImage: seo?.ogImage?.asset?.url ?? null,
    ogImageAlt: seo?.ogImage?.alt ?? null,
    canonical: seo?.canonicalUrl ?? null,
    ogType: seo?.ogType ?? null,
    twitterCard: seo?.twitterCard ?? null,
    robots: seo?.robots ?? null,
  };
}
