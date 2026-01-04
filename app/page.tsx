import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { postsQuery, productsQuery } from '@/lib/sanity/queries'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

export default async function HomePage() {
  // Fetch posts and products from Sanity
  let posts: any[] = []
  let products: any[] = []
  
  try {
    const [postsData, productsData] = await Promise.all([
      client.fetch(postsQuery).catch(() => []),
      client.fetch(productsQuery).catch(() => [])
    ])
    
    posts = Array.isArray(postsData) ? postsData.slice(0, 6) : []
    products = Array.isArray(productsData) ? productsData.slice(0, 6) : []
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              ProductivityTech
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              Tools, guides, and insights for better productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-16 sm:py-20">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Latest Posts
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                View all <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <Card
                  key={post._id}
                  className="group border-border/60 bg-card/40 transition-all hover:border-border"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.heroImage && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={urlFor(post.heroImage).width(400).height(300).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2">
                          {post.categories.slice(0, 2).map((cat: any) => (
                            <Badge key={cat._id} variant="secondary" className="bg-muted/60">
                              {cat.title}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <CardTitle className="line-clamp-2 text-lg leading-snug">
                        {post.title}
                      </CardTitle>
                      {post.excerpt && (
                        <CardDescription className="mt-2 line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    {post.publishedAt && (
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </CardContent>
                    )}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid Section */}
      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-16 sm:py-20">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Products
              </h2>
              <Link
                href="/products"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                View all <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product: any) => (
                <Card
                  key={product._id}
                  className="group border-border/60 bg-card/40 transition-all hover:border-border"
                >
                  <Link href={`/products/${product.slug.current}`}>
                    <CardHeader>
                      {product.productType && (
                        <div className="mb-2">
                          <Badge variant="secondary" className="bg-muted/60">
                            {product.productType}
                          </Badge>
                        </div>
                      )}
                      <CardTitle className="text-lg leading-snug">{product.name}</CardTitle>
                      {product.shortDescription && (
                        <CardDescription className="mt-2">
                          {product.shortDescription}
                        </CardDescription>
                      )}
                    </CardHeader>
                    {product.pricing?.displayText && (
                      <CardContent>
                        <p className="text-lg font-semibold text-primary">
                          {product.pricing.displayText}
                        </p>
                      </CardContent>
                    )}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
