import { client } from '@/lib/sanity/client'
import { productsQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export default async function ProductsPage() {
  let products: any[] = []
  try {
    products = await client.fetch(productsQuery).catch(() => [])
    if (!Array.isArray(products)) products = []
  } catch (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="py-16 sm:py-20">
        <div className="mb-12">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Products
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground">
            Templates, guides, and tools to help you work more effectively.
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Card
                key={product._id}
                className="group border-border/60 bg-card/40 transition-all hover:border-border"
              >
                <Link href={`/products/${product.slug.current}`}>
                  <CardHeader>
                    {product.productType && (
                      <div className="mb-2">
                        <Badge variant="secondary" className="bg-muted/60">
                          {product.productType}
                        </Badge>
                      </div>
                    )}
                    <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
                    {product.shortDescription && (
                      <CardDescription className="mt-2">
                        {product.shortDescription}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {product.pricing?.displayText && (
                    <CardFooter className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-primary">
                        {product.pricing.displayText}
                      </p>
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                      >
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  )}
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No products yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
