import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { postsQuery, productsQuery } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'

  const [posts, products] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(productsQuery),
  ])

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Add blog posts
  const postRoutes: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Add product pages
  const productRoutes: MetadataRoute.Sitemap = (products || []).map((product: any) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...postRoutes, ...productRoutes]
}


