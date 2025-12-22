import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'SaaS', value: 'saas' },
          { title: 'Notion Template', value: 'notion' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'ctaBlock',
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Free', value: 'free' },
              { title: 'One-time', value: 'one-time' },
              { title: 'Subscription', value: 'subscription' },
            ],
          },
        },
        {
          name: 'amount',
          title: 'Amount',
          type: 'string',
          description: 'e.g., "$29", "$9/month"',
        },
        {
          name: 'displayText',
          title: 'Display Text',
          type: 'string',
          description: 'e.g., "Free forever", "Starting at $9/month"',
        },
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'productType',
    },
  },
})


