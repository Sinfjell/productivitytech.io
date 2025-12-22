'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ComparisonBlockProps {
  value: {
    title: string
    toolA: {
      _id: string
      name: string
      logo?: any
    }
    toolB: {
      _id: string
      name: string
      logo?: any
    }
    comparisonPoints?: Array<{
      feature: string
      toolAValue: string
      toolBValue: string
    }>
  }
}

export default function ComparisonBlock({ value }: ComparisonBlockProps) {
  return (
    <Card className="my-8 overflow-hidden">
      <CardHeader className="bg-muted">
        <CardTitle>{value.title}</CardTitle>
      </CardHeader>
      <div className="grid md:grid-cols-2 divide-x divide-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {value.toolA.logo && (
              <Image
                src={urlFor(value.toolA.logo).width(48).height(48).url()}
                alt={value.toolA.name}
                width={48}
                height={48}
                className="rounded"
              />
            )}
            <h4 className="text-xl font-semibold">{value.toolA.name}</h4>
          </div>
        </CardContent>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {value.toolB.logo && (
              <Image
                src={urlFor(value.toolB.logo).width(48).height(48).url()}
                alt={value.toolB.name}
                width={48}
                height={48}
                className="rounded"
              />
            )}
            <h4 className="text-xl font-semibold">{value.toolB.name}</h4>
          </div>
        </CardContent>
      </div>
      {value.comparisonPoints && value.comparisonPoints.length > 0 && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold border-x border-border">
                    {value.toolA.name}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{value.toolB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {value.comparisonPoints.map((point, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="px-6 py-3 font-medium">{point.feature}</td>
                    <td className="px-6 py-3 border-x border-border">{point.toolAValue}</td>
                    <td className="px-6 py-3">{point.toolBValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  )
}


