import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
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
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pricingNotes',
      title: 'Pricing Notes',
      type: 'string',
      description: 'e.g., "Free tier available", "Starts at $10/month"',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use cases or user types this tool is best for',
    }),
    defineField({
      name: 'notFor',
      title: 'Not For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use cases or user types this tool is NOT suitable for',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'websiteUrl',
      media: 'logo',
    },
  },
})



