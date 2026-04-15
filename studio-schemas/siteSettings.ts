import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-expect-error legacy Sanity v3 field used to lock singletons
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'nav',
      title: 'Primary Navigation',
      type: 'array',
      description: 'Links shown in the site header.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Short line shown in the footer.',
        }),
        defineField({
          name: 'socialProofCount',
          title: 'Social Proof Count',
          type: 'number',
          description:
            'Used in social-proof copy ("Join X founders…"). Plain integer.',
        }),
        defineField({
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'footerLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Link',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'href' } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description:
        'Fallback SEO used when a page does not specify its own.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
