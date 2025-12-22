'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CtaBlockProps {
  value: {
    headline: string
    copy?: string
    buttonLabel: string
    buttonLink: string
    schedulingLink?: string
  }
}

export default function CtaBlock({ value }: CtaBlockProps) {
  return (
    <Card className="my-8 bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle>{value.headline}</CardTitle>
        {value.copy && <CardDescription>{value.copy}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
          <Button asChild>
            <Link href={value.buttonLink}>{value.buttonLabel}</Link>
          </Button>
          {value.schedulingLink && (
            <Button asChild variant="outline">
              <Link href={value.schedulingLink}>Schedule a Call</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


