import { client } from '@/lib/sanity/client'
import { productBySlugQuery, productsQuery } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await client.fetch(productsQuery)
  return products.map((product: any) => ({
    slug: product.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let product = null
  try {
    product = await client.fetch(productBySlugQuery, { slug }).catch(() => null)
  } catch (error) {
    console.error('Error fetching product for metadata:', error)
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const title = product.seo?.metaTitle || product.name
  const description = product.seo?.metaDescription || product.shortDescription
  const url = `${baseUrl}/products/${slug}`

  return {
    title,
    description,
    keywords: product.seo?.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ProductivityTech.io',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let product = null
  try {
    product = await client.fetch(productBySlugQuery, { slug }).catch(() => null)
  } catch (error) {
    console.error('Error fetching product:', error)
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-16 sm:py-20">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Product Not Found
          </h1>
          <Button asChild variant="link">
            <Link href="/products">← Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://productivitytech.io'
  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    offers: product.pricing
      ? {
          '@type': 'Offer',
          price: product.pricing.amount || '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    url: `${baseUrl}/products/${slug}`,
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <header className="mb-12">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-muted/60">
                  {product.productType}
                </Badge>
              </div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-xl text-muted-foreground mb-6">{product.shortDescription}</p>
              )}
              {product.pricing?.displayText && (
                <p className="text-2xl font-semibold text-primary mb-8">
                  {product.pricing.displayText}
                </p>
              )}
              {product.primaryCta && (
                <div className="flex gap-4 mb-8 flex-wrap sm:flex-nowrap">
                  <Button asChild size="lg">
                    <Link href={product.primaryCta.url}>{product.primaryCta.label}</Link>
                  </Button>
                  {product.secondaryCta && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={product.secondaryCta.url}>{product.secondaryCta.label}</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Contact me to customize this</Link>
                  </Button>
                </div>
              )}
            </header>
            <div className="prose prose-lg max-w-none mb-12 prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground">
              {product.body && (
                <PortableText value={product.body} components={portableTextComponents} />
              )}
            </div>
            {product.features && product.features.length > 0 && (
              <Card className="mb-8 border-border/60 bg-card/40">
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            {product.useCases && product.useCases.length > 0 && (
              <Card className="mb-8 border-border/60 bg-card/40">
                <CardHeader>
                  <CardTitle>Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {product.useCases.map((useCase: string, idx: number) => (
                      <li key={idx}>{useCase}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

