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
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      {hasAuthors && (
        <>
          {authors.map((author, index) => (
            <span key={author._id} className="font-medium text-foreground">
              {author.name}
              {index < authors.length - 1 && <span className="text-muted-foreground/60">, </span>}
            </span>
          ))}
        </>
      )}
      {hasAuthors && hasDate && (
        <span className="text-muted-foreground/60">·</span>
      )}
      {hasDate && (
        <time dateTime={publishedAt} className="text-muted-foreground">
          {new Date(publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      )}
    </div>
  )
}


