import { defineType, defineField } from 'sanity';

export const googleReview = defineType({
  name: 'googleReview',
  title: 'Google Review',
  type: 'object',
  description:
    'A curated review copied from the public Google Maps page for CWK. Experience.',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1 to 5 stars.',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relativeTime',
      title: 'Relative Time',
      type: 'string',
      description:
        'How Google displays the review age, e.g. "2 weeks ago", "a month ago".',
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      description: 'Optional. Falls back to author initials if omitted.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'authorUrl',
      title: 'Author URL',
      type: 'url',
      description: 'Optional. Link to the reviewer profile if available.',
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'text', media: 'profilePhoto' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? String(subtitle).slice(0, 80) : undefined,
      media,
    }),
  },
});
