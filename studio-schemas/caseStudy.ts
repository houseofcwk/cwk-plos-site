import { defineType, defineField } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client or project name (e.g. "DAWA", "Rob Dial").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'client', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand', value: 'Brand' },
          { title: 'Product', value: 'Product' },
          { title: 'Growth', value: 'Growth' },
          { title: 'Ops', value: 'Ops' },
          { title: 'Content', value: 'Content' },
          { title: 'Agent', value: 'Agent' },
        ],
      },
    }),
    defineField({
      name: 'tagClass',
      title: 'Tag Style',
      type: 'string',
      description: 'Visual style class applied to the category pill.',
      options: {
        list: [
          { title: 'Default', value: 'tag' },
          { title: 'Purple', value: 'tag-purple' },
          { title: 'Pink', value: 'tag-pink' },
        ],
      },
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      description: 'Short blurb shown on the /work index card.',
    }),
    defineField({
      name: 'cardStat',
      title: 'Card Stat',
      type: 'object',
      description: 'Highlight metric shown on the index card.',
      fields: [
        defineField({ name: 'num', title: 'Number', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
      ],
      preview: { select: { title: 'num', subtitle: 'label' } },
    }),
    defineField({
      name: 'headline',
      title: 'Detail Headline',
      type: 'string',
      description: 'H1 used on the case-study detail page.',
    }),
    defineField({
      name: 'duration',
      title: 'Engagement Duration',
      type: 'string',
    }),
    defineField({
      name: 'result',
      title: 'Headline Result',
      type: 'string',
    }),
    defineField({
      name: 'resultLabel',
      title: 'Headline Result Label',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'statItem' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Long-form narrative with inline images.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Alt text is required for accessibility.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
        }),
        defineField({ name: 'author', title: 'Author', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
      ],
      preview: {
        select: { title: 'author', subtitle: 'role' },
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Manual sort order on the /work index (lower = earlier).',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Published (newest)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'category',
      media: 'images.0',
    },
  },
});
