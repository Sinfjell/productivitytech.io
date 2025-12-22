import { client } from '@/lib/sanity/client'
import { pageBySlugQuery } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'

export const revalidate = 60

export default async function AboutPage() {
  let page = null
  try {
    page = await client.fetch(pageBySlugQuery, { slug: 'about' }).catch(() => null)
  } catch (error) {
    console.error('Error fetching page:', error)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        {!page ? (
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
              About
            </h1>
            <p className="text-muted-foreground">
              This page is coming soon. Check back later!
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-8">
              {page.title}
            </h1>
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground">
              {page.content && (
                <PortableText value={page.content} components={portableTextComponents} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
