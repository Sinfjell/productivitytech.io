'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCalloutProps {
  value: {
    product: {
      _id: string
      name: string
      slug: { current: string }
      shortDescription?: string
      primaryCta?: {
        label: string
        url: string
      }
    }
    pitch?: string
  }
}

export default function ProductCallout({ value }: ProductCalloutProps) {
  return (
    <Card className="my-8 bg-accent/50 border-accent">
      <CardHeader>
        <CardTitle>{value.product.name}</CardTitle>
        {value.pitch && <CardDescription>{value.pitch}</CardDescription>}
        {value.product.shortDescription && !value.pitch && (
          <CardDescription>{value.product.shortDescription}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
          {value.product.primaryCta ? (
            <Button asChild>
              <Link href={value.product.primaryCta.url}>
                {value.product.primaryCta.label}
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/products/${value.product.slug.current}`}>
                Learn More
              </Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href={`/products/${value.product.slug.current}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


