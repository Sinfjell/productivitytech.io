'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  if (isHomepage) {
    return null
  }

  return <Header />
}

