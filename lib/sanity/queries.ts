// Using groq template literal - no import needed in newer versions
// If this doesn't work, we can use string literals directly

// Post queries
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  categories[]->{
    _id,
    title,
    slug
  },
  heroImage
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  content,
  heroImage,
  authors[]->{
    _id,
    name,
    slug,
    image
  },
  categories[]->{
    _id,
    title,
    slug
  },
  relatedProducts[]->{
    _id,
    name,
    slug,
    shortDescription
  },
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Product queries
export const productsQuery = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  name,
  slug,
  productType,
  shortDescription,
  pricing
}`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  productType,
  shortDescription,
  body,
  features[],
  useCases[],
  pricing,
  primaryCta {
    label,
    url
  },
  secondaryCta {
    label,
    url
  },
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Category queries
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`

// Page queries
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`


