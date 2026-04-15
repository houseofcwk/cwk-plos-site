import { defineType, defineField } from 'sanity';

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'Call-to-Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      description: 'The visible text on the button.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Destination URL or path. Use a relative path for internal links (e.g. /work) and a full URL for external links.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
});
