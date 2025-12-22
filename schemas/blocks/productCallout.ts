import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productCallout',
  title: 'Product Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: { type: 'product' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      title: 'Pitch',
      type: 'text',
      rows: 2,
      description: 'Short pitch text for this product',
    }),
  ],
  preview: {
    select: {
      productName: 'product.name',
      pitch: 'pitch',
    },
    prepare({ productName, pitch }) {
      return {
        title: productName || 'Product',
        subtitle: pitch || 'Product callout',
      }
    },
  },
})


