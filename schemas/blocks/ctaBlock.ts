import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schedulingLink',
      title: 'Scheduling Link',
      type: 'url',
      description: 'Optional Calendly or other scheduling link',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'buttonLabel',
    },
  },
})


