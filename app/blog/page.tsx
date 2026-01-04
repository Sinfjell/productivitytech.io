import { client } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await client.fetch(postsQuery).catch(() => [])
    if (!Array.isArray(posts)) posts = []
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-12">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Articles on productivity, tools, and building better workflows.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Card
                key={post._id}
                className="group border-border/40 bg-card/30 transition-all hover:border-border/60 hover:bg-card/40"
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
                    <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
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
                        className="inline-flex items-center text-sm font-medium text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary/80 transition-colors"
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
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        )}
    </div>
  )
}
