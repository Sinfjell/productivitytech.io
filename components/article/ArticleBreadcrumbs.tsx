import Link from 'next/link'

interface ArticleBreadcrumbsProps {
  category?: {
    _id: string
    title: string
    slug: { current: string }
  }
}

export function ArticleBreadcrumbs({ category }: ArticleBreadcrumbsProps) {
  return (
    <nav className="text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/blog"
          className="transition-colors hover:text-foreground"
        >
          Blog
        </Link>
        {category && (
          <>
            <span className="text-muted-foreground/40">/</span>
            <Link
              href={`/categories/${category.slug.current}`}
              className="transition-colors hover:text-foreground"
            >
              {category.title}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}


