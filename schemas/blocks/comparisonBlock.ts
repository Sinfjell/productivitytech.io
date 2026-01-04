import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonBlock',
  title: 'Comparison Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Tool A vs Tool B"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'toolA',
      title: 'Tool A',
      type: 'reference',
      to: { type: 'tool' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'toolB',
      title: 'Tool B',
      type: 'reference',
      to: { type: 'tool' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comparisonPoints',
      title: 'Comparison Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
            },
            {
              name: 'toolAValue',
              title: 'Tool A Value',
              type: 'string',
            },
            {
              name: 'toolBValue',
              title: 'Tool B Value',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      toolAName: 'toolA.name',
      toolBName: 'toolB.name',
    },
    prepare({ title, toolAName, toolBName }) {
      return {
        title: title || 'Comparison',
        subtitle: `${toolAName || 'Tool A'} vs ${toolBName || 'Tool B'}`,
      }
    },
  },
})



