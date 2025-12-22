import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { ArticleBreadcrumbs } from './ArticleBreadcrumbs'
import { ArticleMeta } from './ArticleMeta'

interface Author {
  _id: string
  name: string
  slug?: { current: string }
  image?: any
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface CoverImage {
  asset: any
  alt?: string
}

interface ArticleShellProps {
  title: string
  excerpt?: string
  publishedAt?: string
  authors?: Author[]
  category?: Category
  coverImage?: CoverImage
  children: React.ReactNode
}

export function ArticleShell({
  title,
  excerpt,
  publishedAt,
  authors,
  category,
  coverImage,
  children,
}: ArticleShellProps) {
  return (
    <article className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-[720px]">
          <ArticleBreadcrumbs category={category} />
          
          <header className="mb-12">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
              {title}
            </h1>
            {excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {excerpt}
              </p>
            )}
            <ArticleMeta authors={authors} publishedAt={publishedAt} />
          </header>

          {coverImage && (
            <div className="relative mb-12 w-full rounded-lg overflow-hidden border border-border/40">
              <div className="relative aspect-video w-full">
                <Image
                  src={urlFor(coverImage).width(1200).height(675).url()}
                  alt={coverImage.alt || title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="article-content">
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

