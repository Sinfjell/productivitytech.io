'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm font-semibold tracking-tight">ProductivityTech</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/products"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link href="/blog">Read</Link>
          </Button>
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="/products">
              Explore
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-8">
                <Link
                  href="/blog"
                  className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                >
                  Blog
                </Link>
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                >
                  About
                </Link>
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                  <Button asChild className="w-full">
                    <Link href="/products">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
