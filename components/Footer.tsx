import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold">ProductivityTech</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Calm, modern content and products for better work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Explore</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/blog"
                >
                  Blog
                </Link>
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/products"
                >
                  Products
                </Link>
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/categories"
                >
                  Categories
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Company</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/about"
                >
                  About
                </Link>
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Legal</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/legal/privacy"
                >
                  Privacy
                </Link>
                <Link
                  className="block transition-colors hover:text-foreground"
                  href="/legal/affiliate-disclosure"
                >
                  Disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} ProductivityTech. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/rss.xml" className="transition-colors hover:text-foreground">
              RSS
            </Link>
            <Link href="/newsletter" className="transition-colors hover:text-foreground">
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
