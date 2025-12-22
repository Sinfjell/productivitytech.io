import { client } from '@/lib/sanity/client'
import { postBySlugQuery, postsQuery } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import { articlePortableTextComponents } from '@/components/portable-text/ArticlePortableTextComponents'
import { urlFor } from '@/lib/sanity/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArticleShell } from '@/components/article/ArticleShell'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try {
    post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  } catch (error) {
    console.error('Error fetching post for metadata:', error)
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt
  const url = `${baseUrl}/blog/${slug}`
  const image = post.heroImage
    ? urlFor(post.heroImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.jpg`

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ProductivityTech.io',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null
  try {
    post = await client.fetch(postBySlugQuery, { slug }).catch(() => null)
  } catch (error) {
    console.error('Error fetching post:', error)
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-16 sm:py-20">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Post Not Found
          </h1>
          <Button asChild variant="link">
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage
      ? urlFor(post.heroImage).width(1200).height(630).url()
      : `${baseUrl}/og-image.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'ProductivityTech.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProductivityTech.io',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  } : null

  const firstCategory = post.categories && post.categories.length > 0 ? post.categories[0] : undefined

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleShell
        title={post.title}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        authors={post.authors}
        category={firstCategory}
        coverImage={post.heroImage}
      >
        {post.content && (
          <PortableText value={post.content} components={articlePortableTextComponents} />
        )}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <Card className="mt-16 border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Related Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {post.relatedProducts.map((product: any) => (
                  <li key={product._id}>
                    <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                      <Link href={`/products/${product.slug.current}`}>
                        {product.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </ArticleShell>
    </>
  )
}

