'use client'

import { PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import CtaBlock from './CtaBlock'
import AffiliateBlock from './AffiliateBlock'
import ComparisonBlock from './ComparisonBlock'
import ProductCallout from './ProductCallout'

export const portableTextComponents: PortableTextComponents = {
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
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-sm text-muted-foreground text-center">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold mt-3 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-primary hover:underline underline-offset-4"
        >
          {children}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
}


