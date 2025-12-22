'use client'

import { PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import CtaBlock from './CtaBlock'
import AffiliateBlock from './AffiliateBlock'
import ComparisonBlock from './ComparisonBlock'
import ProductCallout from './ProductCallout'

export const articlePortableTextComponents: PortableTextComponents = {
  types: {
    ctaBlock: CtaBlock,
    affiliateBlock: AffiliateBlock,
    comparisonBlock: ComparisonBlock,
    productCallout: ProductCallout,
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-10">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="mt-3 text-sm text-muted-foreground text-center">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold tracking-tight mt-10 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-5 first:mt-0 border-b border-border/40 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold tracking-tight mt-6 mb-3 first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border/60 pl-4 italic my-6 text-muted-foreground/90 leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary/80 transition-colors"
        >
          {children}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted/60 px-1.5 py-0.5 rounded text-[0.9em] font-mono text-foreground/90">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside mb-6 space-y-2 ml-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside mb-6 space-y-2 ml-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-2 leading-relaxed text-foreground/90 pl-1">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="ml-2 leading-relaxed text-foreground/90 pl-1">
        {children}
      </li>
    ),
  },
}

