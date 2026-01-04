import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'affiliateLink',
  title: 'Affiliate Link',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Display name for this affiliate link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vendor',
      title: 'Vendor',
      type: 'string',
      description: 'Company/vendor name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disclosureText',
      title: 'Disclosure Text',
      type: 'text',
      rows: 2,
      description: 'Standard disclosure text for this affiliate link',
      initialValue: 'This is an affiliate link. If you make a purchase, I may earn a commission at no additional cost to you.',
    }),
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
      description: 'Optional coupon/promo code',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this affiliate link',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'vendor',
    },
  },
})



