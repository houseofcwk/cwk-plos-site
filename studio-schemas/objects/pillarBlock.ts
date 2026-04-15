import { defineType, defineField } from 'sanity';

export const pillarBlock = defineType({
  name: 'pillarBlock',
  title: 'Pillar',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Pillar Key',
      type: 'string',
      description:
        'Identifies which of the four pillars this block represents. Drives styling and ordering on the home page.',
      options: {
        list: [
          { title: 'Mind', value: 'mind' },
          { title: 'Body', value: 'body' },
          { title: 'Soul', value: 'soul' },
          { title: 'Pocket', value: 'pocket' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'key' },
  },
});
