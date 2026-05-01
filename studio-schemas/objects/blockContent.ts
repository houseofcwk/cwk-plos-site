import { defineType, defineArrayMember, defineField } from 'sanity';

/**
 * Rich-text Portable Text array used across every long-form body field
 * in the site (bios, case-study bodies, legal pages, etc.).
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO.',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'gallery',
      title: 'Image Gallery',
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                defineField({ name: 'caption', title: 'Caption', type: 'string' }),
              ],
            },
          ],
          validation: (Rule) => Rule.min(2).max(12),
        }),
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'number',
          options: { list: [2, 3] },
          initialValue: 3,
        }),
      ],
      preview: { select: { images: 'images', columns: 'columns' }, prepare: ({ images, columns }) => ({ title: `Gallery (${images?.length ?? 0} images, ${columns ?? 3}-up)` }) },
    }),
    defineArrayMember({
      type: 'object',
      name: 'videoEmbed',
      title: 'Video Embed',
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube / Vimeo URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'title', title: 'Title (for accessibility)', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
      preview: { select: { title: 'title', subtitle: 'url' } },
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        defineField({
          name: 'tone',
          title: 'Tone',
          type: 'string',
          options: { list: ['info', 'success', 'warn', 'quote'] },
          initialValue: 'info',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'attribution', title: 'Attribution (optional)', type: 'string' }),
      ],
      preview: { select: { title: 'text', subtitle: 'tone' } },
    }),
  ],
});
