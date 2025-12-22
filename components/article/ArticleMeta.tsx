import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface Author {
  _id: string
  name: string
  slug?: { current: string }
  image?: any
}

interface ArticleMetaProps {
  authors?: Author[]
  publishedAt?: string
}

export function ArticleMeta({ authors, publishedAt }: ArticleMetaProps) {
  const hasAuthors = authors && authors.length > 0
  const hasDate = publishedAt

  if (!hasAuthors && !hasDate) {
    return null
  }

  return (
    <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
      {hasAuthors && (
        <div className="flex items-center gap-3">
          {authors.map((author, index) => (
            <div key={author._id} className="flex items-center gap-2">
              {author.image && (
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={urlFor(author.image).width(48).height(48).url()}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="font-medium">{author.name}</span>
              {index < authors.length - 1 && (
                <span className="text-muted-foreground/60">,</span>
              )}
            </div>
          ))}
        </div>
      )}
      {hasAuthors && hasDate && (
        <span className="text-muted-foreground/60">·</span>
      )}
      {hasDate && (
        <time dateTime={publishedAt}>
          {new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      )}
    </div>
  )
}

