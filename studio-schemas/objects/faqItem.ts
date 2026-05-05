import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Plain text. Becomes the FAQPage JSON-LD answer.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? String(subtitle).slice(0, 90) : undefined,
    }),
  },
});
