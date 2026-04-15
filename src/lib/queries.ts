import groq from 'groq';

/**
 * Site-wide settings singleton: navigation, footer, and default SEO metadata.
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    nav,
    footer,
    defaultSeo
  }
`;

/**
 * Home page singleton — project all fields including nested sections and
 * dereferenced image assets so we can render without extra round-trips.
 */
export const HOME_QUERY = groq`
  *[_type == "homePage"][0]{
    ...,
    hero{
      ...,
      image{
        ...,
        asset->{ url, metadata }
      }
    },
    sections[]{
      ...,
      image{
        ...,
        asset->{ url, metadata }
      },
      images[]{
        ...,
        asset->{ url, metadata }
      }
    },
    seo
  }
`;

/**
 * Product page singleton.
 */
export const PRODUCT_QUERY = groq`
  *[_type == "productPage"][0]{
    ...,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    sections[]{
      ...,
      image{ ..., asset->{ url, metadata } },
      images[]{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * About page singleton.
 */
export const ABOUT_QUERY = groq`
  *[_type == "aboutPage"][0]{
    ...,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    sections[]{
      ...,
      image{ ..., asset->{ url, metadata } },
      images[]{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * Journey page singleton.
 */
export const JOURNEY_QUERY = groq`
  *[_type == "journeyPage"][0]{
    ...,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    sections[]{
      ...,
      image{ ..., asset->{ url, metadata } },
      images[]{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * Brand Mirror page singleton.
 */
export const BRAND_MIRROR_QUERY = groq`
  *[_type == "brandMirrorPage"][0]{
    ...,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    sections[]{
      ...,
      image{ ..., asset->{ url, metadata } },
      images[]{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * Side Quests page singleton.
 */
export const SIDE_QUESTS_QUERY = groq`
  *[_type == "sideQuestsPage"][0]{
    ...,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    sections[]{
      ...,
      image{ ..., asset->{ url, metadata } },
      images[]{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * Case study list — card-level fields only, ordered for index/grid display.
 */
export const CASE_LIST_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc, publishedAt desc){
    "slug": slug.current,
    client,
    category,
    tagClass,
    cardDescription,
    cardStat,
    seo
  }
`;

/**
 * Single case study by slug — full body, images, testimonial, SEO.
 * Parameterised on $slug.
 */
export const CASE_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    client,
    category,
    tagClass,
    cardDescription,
    cardStat,
    order,
    publishedAt,
    hero{
      ...,
      image{ ..., asset->{ url, metadata } }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ url, metadata }
      },
      markDefs[]{ ... }
    },
    images[]{
      ...,
      asset->{ url, metadata }
    },
    testimonial{
      ...,
      avatar{ ..., asset->{ url, metadata } }
    },
    seo
  }
`;

/**
 * All published case-study slugs — used by getStaticPaths().
 */
export const CASE_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;

/**
 * Legal page by slug (privacy, terms, etc). Parameterised on $slug.
 */
export const LEGAL_QUERY = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title,
    updatedAt,
    body,
    seo
  }
`;
