import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description:
        'Appears in the browser tab and in search results. Aim for ~60 characters.',
      validation: (Rule) => Rule.max(70).warning('Keep under ~70 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Appears below the title in search results. Aim for ~155 characters.',
      validation: (Rule) =>
        Rule.max(200).warning('Keep under ~160 characters for best results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Image used when the page is shared on social media. 1200x630 recommended.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
});
