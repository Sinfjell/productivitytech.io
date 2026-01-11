import { client } from '@/lib/sanity/client'
import { pageBySlugQuery, pagesQuery } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const pages = await client.fetch(pagesQuery)
  return (pages || []).map((page: any) => ({
    slug: page.slug.current,
  }))
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let page = null
  try {
    page = await client.fetch(pageBySlugQuery, { slug }).catch(() => null)
  } catch (error) {
    console.error('Error fetching page:', error)
  }

  if (!page) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-16 sm:py-20">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
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
      </div>
    </div>
  )
}
