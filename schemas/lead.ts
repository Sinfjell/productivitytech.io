import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'The page URL where the lead submitted the form',
    }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      options: {
        list: [
          { title: 'Consulting', value: 'consulting' },
          { title: 'Product Inquiry', value: 'product' },
          { title: 'Support', value: 'support' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Replied', value: 'replied' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle} - ${status || 'new'}`,
      }
    },
  },
})



