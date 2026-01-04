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
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-[680px]">
          {/* Breadcrumbs - Centered */}
          <div className="mb-8 flex justify-center">
            <ArticleBreadcrumbs category={category} />
          </div>
          
          {/* Title - Centered */}
          <header className="mb-8 text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl mb-8 leading-tight">
              {title}
            </h1>
          </header>

          {/* Featured Image - Centered */}
          {coverImage && (
            <div className="relative mb-12 w-full overflow-hidden -mx-4 sm:mx-0 sm:rounded-lg">
              <div className="relative aspect-[16/9] w-full">
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

          {/* Author and Date - Centered */}
          <div className="mb-12 flex justify-center">
            <ArticleMeta authors={authors} publishedAt={publishedAt} />
          </div>

          {/* Body Content */}
          <div className="article-content [&>*:first-child]:mt-0">
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

