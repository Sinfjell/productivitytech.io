import { client } from '@/lib/sanity/client'
import { postsQuery, categoriesQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery)
  return (categories || []).map((category: any) => ({
    slug: category.slug.current,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Fetch all posts and filter by category on the client side
  // In production, you'd want a more efficient query
  const allPosts = await client.fetch(postsQuery)
  const categoryPosts = allPosts.filter((post: any) =>
    post.categories?.some((cat: any) => cat.slug.current === slug)
  )

  const categoryName = slug.replace(/-/g, ' ')

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        <div className="mb-12">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl capitalize">
            {categoryName}
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground">
            Posts in the {categoryName} category.
          </p>
        </div>

        {categoryPosts && categoryPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post: any) => (
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
                    <CardTitle className="line-clamp-2 text-base leading-snug">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="mt-2 line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {post.publishedAt && (
                    <CardFooter className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                      >
                        Read <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  )}
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
