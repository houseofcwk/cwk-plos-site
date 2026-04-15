import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // @ts-expect-error legacy Sanity v3 field used to lock singletons
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      description: 'Small label shown above the hero headline.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main hero headline. Supports the word-flip phrase slot.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wordFlipPhrases',
      title: 'Word-Flip Phrases',
      type: 'array',
      description:
        'Rotating phrases used inside the hero headline (e.g. "sports agent", "brand architect").',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.required().min(2).error('Add at least two phrases to rotate.'),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'blockContent',
      description: 'Rich-text paragraph under the headline.',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero Call-to-Action',
      type: 'ctaButton',
    }),
    defineField({
      name: 'pillars',
      title: 'Four Pillars',
      type: 'array',
      description:
        'Must contain exactly four pillars: Mind, Body, Soul, Pocket.',
      of: [{ type: 'pillarBlock' }],
      validation: (Rule) =>
        Rule.required()
          .length(4)
          .error('Home page requires exactly four pillars.'),
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
    prepare: () => ({ title: 'Home Page' }),
  },
});
