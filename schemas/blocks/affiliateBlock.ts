import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'affiliateBlock',
  title: 'Affiliate Block',
  type: 'object',
  fields: [
    defineField({
      name: 'tool',
      title: 'Tool',
      type: 'reference',
      to: { type: 'tool' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'reference',
      to: { type: 'affiliateLink' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customDisclosure',
      title: 'Custom Disclosure',
      type: 'text',
      rows: 2,
      description: 'Override default disclosure text if needed',
    }),
  ],
  preview: {
    select: {
      toolName: 'tool.name',
      affiliateLabel: 'affiliateLink.label',
    },
    prepare({ toolName, affiliateLabel }) {
      return {
        title: toolName || 'Tool',
        subtitle: `Affiliate: ${affiliateLabel || 'N/A'}`,
      }
    },
  },
})



