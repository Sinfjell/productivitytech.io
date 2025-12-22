'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AffiliateBlockProps {
  value: {
    tool: {
      _id: string
      name: string
      slug: { current: string }
      logo?: any
      websiteUrl: string
    }
    affiliateLink: {
      _id: string
      label: string
      url: string
      disclosureText: string
      couponCode?: string
    }
    customDisclosure?: string
  }
}

export default function AffiliateBlock({ value }: AffiliateBlockProps) {
  const disclosure = value.customDisclosure || value.affiliateLink.disclosureText

  return (
    <Card className="my-8">
      <CardHeader>
        <div className="flex items-center gap-4">
          {value.tool.logo && (
            <Image
              src={urlFor(value.tool.logo).width(64).height(64).url()}
              alt={value.tool.name}
              width={64}
              height={64}
              className="rounded"
            />
          )}
          <div>
            <CardTitle>{value.tool.name}</CardTitle>
            <CardDescription>{value.affiliateLink.label}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild>
          <Link
            href={value.affiliateLink.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {value.affiliateLink.couponCode ? (
              <>
                Get {value.tool.name} <Badge variant="secondary" className="ml-2">{value.affiliateLink.couponCode}</Badge>
              </>
            ) : (
              `Get ${value.tool.name}`
            )}
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground italic">{disclosure}</p>
      </CardContent>
    </Card>
  )
}


