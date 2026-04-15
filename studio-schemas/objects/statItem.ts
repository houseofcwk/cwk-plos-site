import { defineType, defineField } from 'sanity';

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description:
        'The headline number or metric (e.g. "3.5yr", "2.4M", "98%").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Short description shown beneath the value.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
});
