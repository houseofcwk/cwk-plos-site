import { defineType, defineField } from 'sanity';

export const brandMirrorPage = defineType({
  name: 'brandMirrorPage',
  title: 'Brand Mirror Page',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'quizCta',
      title: 'Quiz Call-to-Action',
      type: 'ctaButton',
      description: 'Primary CTA that launches the Brand Mirror quiz.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Brand Mirror Page' }),
  },
});
