import { defineType, defineField } from 'sanity';

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  // @ts-expect-error legacy Sanity v3 field used to lock singletons
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Feature Sections',
      type: 'array',
      of: [{ type: 'featureBlock' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Product Page' }),
  },
});
