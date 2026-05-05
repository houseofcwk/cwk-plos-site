import { defineType, defineField } from 'sanity';

// Drives the Organization JSON-LD block emitted site-wide. All fields optional;
// hardcoded fallbacks live in src/lib/seoFallbacks.ts so a missing siteSettings
// document never breaks the site.
export const organizationSchema = defineType({
  name: 'organizationSchema',
  title: 'Organization (JSON-LD)',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'alternateName',
      title: 'Alternate Names',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. CWK, House of CWK, CWK Experience.',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      description: 'e.g. "The Sports Agent for Entrepreneurs".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'foundingDate',
      title: 'Founding Year',
      type: 'string',
      description: 'YYYY format, e.g. 2023.',
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
    }),
    defineField({
      name: 'founderJobTitle',
      title: 'Founder Job Title',
      type: 'string',
      initialValue: 'Founder',
    }),
    defineField({
      name: 'founderSameAs',
      title: 'Founder Profiles (sameAs)',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Founder social/profile URLs.',
    }),
    defineField({
      name: 'addressLocality',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'addressRegion',
      title: 'State / Region',
      type: 'string',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country',
      type: 'string',
      description: 'ISO code, e.g. US.',
    }),
    defineField({
      name: 'areaServed',
      title: 'Area Served',
      type: 'string',
      initialValue: 'Worldwide',
    }),
    defineField({
      name: 'knowsAbout',
      title: 'Knows About',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Topical authority signals.',
    }),
  ],
});
