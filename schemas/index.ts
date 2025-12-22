import { defineType, defineField } from 'sanity'
import post from './post'
import product from './product'
import tool from './tool'
import affiliateLink from './affiliateLink'
import category from './category'
import page from './page'
import lead from './lead'
import author from './author'
import ctaBlock from './blocks/ctaBlock'
import affiliateBlock from './blocks/affiliateBlock'
import comparisonBlock from './blocks/comparisonBlock'
import productCallout from './blocks/productCallout'

export const schemaTypes = [
  // Document types
  post,
  product,
  tool,
  affiliateLink,
  category,
  page,
  lead,
  author,
  // Block types
  ctaBlock,
  affiliateBlock,
  comparisonBlock,
  productCallout,
]


