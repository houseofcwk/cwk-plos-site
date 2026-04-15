import { defineType, defineField } from 'sanity';

export const featureBlock = defineType({
  name: 'featureBlock',
  title: 'Feature Block',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Anchor ID',
      type: 'slug',
      description:
        'Used as an anchor link and a stable reference. Generated from the headline.',
      options: { source: 'headline', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      description: 'Short bullet points shown alongside the feature.',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'body' },
  },
});
