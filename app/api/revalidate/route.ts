import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const secret = request.headers.get('x-sanity-revalidate-secret') || request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.REVALIDATION_SECRET

    if (!expectedSecret) {
      console.error('REVALIDATION_SECRET is not set in environment variables')
      return NextResponse.json(
        { error: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const body = await request.json().catch(() => ({}))
    const { _type, slug } = body

    // Determine which paths to revalidate based on document type
    const pathsToRevalidate: string[] = []

    switch (_type) {
      case 'post':
        // Revalidate the specific blog post
        if (slug?.current) {
          pathsToRevalidate.push(`/blog/${slug.current}`)
        }
        // Revalidate blog listing and home page
        pathsToRevalidate.push('/blog', '/')
        // Revalidate sitemap and RSS feed
        pathsToRevalidate.push('/sitemap.xml', '/feed.xml')
        break

      case 'product':
        // Revalidate the specific product page
        if (slug?.current) {
          pathsToRevalidate.push(`/products/${slug.current}`)
        }
        // Revalidate products listing and home page
        pathsToRevalidate.push('/products', '/')
        // Revalidate sitemap
        pathsToRevalidate.push('/sitemap.xml')
        break

      case 'category':
        // Revalidate the specific category page
        if (slug?.current) {
          pathsToRevalidate.push(`/categories/${slug.current}`)
        }
        // Categories might affect blog posts, so revalidate blog listing
        pathsToRevalidate.push('/blog')
        break

      case 'page':
        // Revalidate the specific page
        if (slug?.current) {
          // About page uses /about route, not /legal/about
          if (slug.current === 'about') {
            pathsToRevalidate.push('/about')
          } else {
            // Other pages use /legal/[slug] route
            pathsToRevalidate.push(`/legal/${slug.current}`)
          }
        }
        // Revalidate sitemap
        pathsToRevalidate.push('/sitemap.xml')
        break

      default:
        // For unknown types, revalidate common pages
        pathsToRevalidate.push('/', '/blog', '/products', '/sitemap.xml', '/feed.xml')
    }

    // Revalidate each path
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        console.log(`Revalidated path: ${path}`)
      } catch (error) {
        console.error(`Error revalidating path ${path}:`, error)
      }
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    )
  }
}
