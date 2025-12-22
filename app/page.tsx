import Link from 'next/link'
import { ArrowRight, Check, Layers, LineChart, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const FEATURES = [
  {
    title: 'Clarity by default',
    description: 'A clean structure that keeps content scannable and your next step obvious.',
    icon: Sparkles,
  },
  {
    title: 'Fast, composable blocks',
    description: 'Reusable sections and components that scale without visual clutter.',
    icon: Layers,
  },
  {
    title: 'Results you can measure',
    description: 'Design choices that prioritize conversion, readability, and performance.',
    icon: LineChart,
  },
]

const BLOG_POSTS = [
  {
    title: 'How to build a calmer workflow',
    excerpt: 'Practical tactics to reduce cognitive load and stay consistent week to week.',
    date: 'Dec 2025',
    href: '/blog',
    tag: 'Workflow',
  },
  {
    title: 'A minimalist content system that scales',
    excerpt: 'A sane structure for writing, publishing, and updating content without chaos.',
    date: 'Dec 2025',
    href: '/blog',
    tag: 'Content',
  },
  {
    title: 'Designing for focus, not noise',
    excerpt: 'Whitespace, hierarchy, and restraint: the levers that make products feel premium.',
    date: 'Dec 2025',
    href: '/blog',
    tag: 'Design',
  },
]

const PRODUCTS = [
  {
    name: 'Notion Templates',
    description: 'Opinionated systems for planning, writing, and shipping.',
    bullets: ['Plug-and-play', 'Clean structure', 'Fast to customize'],
    href: '/products',
  },
  {
    name: 'Guides & Playbooks',
    description: 'Tactical docs for building repeatable productivity habits.',
    bullets: ['Short, actionable', 'No fluff', 'Designed to reuse'],
    href: '/products',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Subtle background treatment */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_10%_20%,hsl(var(--primary)/0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_90%_10%,hsl(var(--primary)/0.08),transparent_55%)]" />
      </div>

      {/* Fixed Header */}
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
            <Button className="inline-flex" asChild>
              <Link href="/products">
                Explore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-20 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <Badge variant="secondary" className="border-border/60 bg-muted/60">
                  Neutral design. One strong accent.
                </Badge>
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Build a homepage that feels{' '}
                <span className="text-primary">calm</span>, modern, and fast.
              </h1>

              <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
                A Linear-inspired layout using Tailwind + shadcn/ui: clean hierarchy, generous
                whitespace, and a single blue accent that guides attention.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/products">
                    Get the templates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/blog">Read the blog</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {['Fast load', 'Accessible defaults', 'Composable sections'].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-7">
                    <div className="rounded-xl border border-border/60 bg-background/50 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Preview</div>
                        <div className="text-xs text-muted-foreground">Hero + sections</div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="h-3 w-2/3 rounded bg-muted" />
                        <div className="h-3 w-1/2 rounded bg-muted" />
                        <div className="h-9 w-40 rounded bg-primary/15 ring-1 ring-primary/20" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <div className="rounded-xl border border-border/60 bg-background/50 p-5">
                      <div className="text-sm font-medium">Single accent system</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Keep everything neutral. Use blue for CTAs, links, and key emphasis only.
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="h-9 rounded bg-muted" />
                        <div className="h-9 rounded bg-muted" />
                        <div className="h-9 rounded bg-primary/15 ring-1 ring-primary/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="mx-auto mt-16 max-w-6xl" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Designed for focus
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Clean components, subtle borders, and spacing that makes everything easier to read.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="border-border/60 bg-card/40">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <CardTitle className="text-base">{feature.title}</CardTitle>
                          <CardDescription className="mt-1">{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-16 sm:py-20">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  Latest writing
                </h2>
                <p className="mt-3 text-pretty text-muted-foreground">
                  Short posts on building repeatable systems, clean design, and calm productivity.
                </p>
              </div>

              <Button variant="outline" asChild>
                <Link href="/blog">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <Card key={post.title} className="border-border/60 bg-card/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-muted/60">
                        {post.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="mt-3 text-base leading-snug">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={post.href}
                      className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                    >
                      Read more <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Product Preview Section */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="py-16 sm:py-20">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="max-w-xl">
                  <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Products built to ship
                  </h2>
                  <p className="mt-3 text-pretty text-muted-foreground">
                    Templates and guides that keep your workflow simple and your output consistent.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" asChild>
                      <Link href="/products">
                        Browse products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/about">Why this works</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid w-full gap-4 md:max-w-md">
                  {PRODUCTS.map((product) => (
                    <Card key={product.name} className="border-border/60 bg-background/40">
                      <CardHeader>
                        <CardTitle className="text-base">{product.name}</CardTitle>
                        <CardDescription className="mt-1">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {product.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-2">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <Link
                            href={product.href}
                            className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                          >
                            Learn more <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
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
                      href="/privacy"
                    >
                      Privacy
                    </Link>
                    <Link
                      className="block transition-colors hover:text-foreground"
                      href="/terms"
                    >
                      Terms
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
      </main>
    </div>
  )
}
