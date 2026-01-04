# ProductivityTech.io

A content-first website built with Next.js, Sanity CMS, and Vercel. Designed to promote productivity tools, affiliate links, and your own SaaS products while capturing leads for consulting work.

## Features

- **SEO + GEO Optimized**: Structured content for search engines and AI answers
- **Affiliate Link Management**: Built-in support for affiliate links with proper disclosures
- **Product Pages**: First-class support for your SaaS products and Notion templates
- **Lead Capture**: Contact form that stores leads in Sanity and sends emails via Resend
- **Content Blocks**: Reusable CTA, affiliate, comparison, and product callout blocks
- **ISR (Incremental Static Regeneration)**: Fast, SEO-friendly static pages with automatic updates

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity (hosted Studio)
- **Deployment**: Vercel
- **Email**: Resend
- **Image Optimization**: Next.js Image + Sanity Image URLs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Sanity account (project ID: `g3aw9p5p`, dataset: `production`)
- Resend account (for contact form emails)
- Vercel account (for deployment)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Sanity
SANITY_API_TOKEN=your_sanity_api_token_here

# Resend (for contact form)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@productivitytech.io
RESEND_TO_EMAIL=your_email@example.com

# Site
NEXT_PUBLIC_SITE_URL=https://productivitytech.io
```

3. Set up Sanity Studio:

The Sanity project is already configured (project ID: `g3aw9p5p`, dataset: `production`). To deploy the Studio:

```bash
npm create sanity@latest -- --project g3aw9p5p --dataset production --template clean
```

Or deploy the Studio separately using Sanity's hosted Studio.

4. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## Sanity Setup

### Getting Your API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (`g3aw9p5p`)
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions (for writing leads)
5. Add it to your `.env.local` as `SANITY_API_TOKEN`

### Content Types

The following content types are available in Sanity:

- **Post**: Blog posts with SEO fields, categories, and related products
- **Product**: Your SaaS products and Notion templates
- **Tool**: Software/apps you promote (separate from affiliate links)
- **AffiliateLink**: Reusable affiliate links with disclosures
- **Category**: Taxonomy for organizing content
- **Page**: Static pages (About, Contact, Legal pages)
- **Lead**: Contact form submissions (auto-created)

### Content Blocks

Portable Text blocks available in posts:

- **CTA Block**: Call-to-action with headline, copy, and button
- **Affiliate Block**: Tool reference + affiliate link with disclosure
- **Comparison Block**: Side-by-side tool comparisons
- **Product Callout**: Product promotion blocks

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will automatically rebuild when you push to your main branch.

### Environment Variables in Vercel

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## Initial Content Setup

After deploying, create the following content in Sanity Studio:

### 1. Legal Pages

Create two pages with slugs:
- `privacy` (Privacy Policy)
- `affiliate-disclosure` (Affiliate Disclosure)

### 2. About Page

Create a page with slug `about`.

### 3. Sample Blog Posts

Create at least 3 blog posts targeting specific SEO queries. Each post should have:
- Title and slug
- Excerpt
- Hero image
- Content with proper headings (H2/H3 for SEO)
- Categories
- SEO metadata

### 4. Sample Products

Create 1-2 product pages:
- One Notion template
- One SaaS product (if applicable)

Each product should have:
- Name and slug
- Product type
- Short description
- Features and use cases
- Pricing information
- Primary CTA

### 5. Tools and Affiliate Links

Create tool entries for software you want to promote, and corresponding affiliate links.

## SEO Features

- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Available at `/robots.txt`
- **RSS Feed**: Available at `/feed.xml`
- **Structured Data**: JSON-LD for blog posts and products
- **Open Graph**: Full OG tags for social sharing
- **Canonical URLs**: Proper canonical tags on all pages

## GEO (AI Search) Optimization

Content is structured for AI search engines:

- **Clear definitions** early in articles
- **"Best for / Not for"** sections in tool descriptions
- **Comparison blocks** for tool comparisons
- **Internal linking** between related content
- **Structured headings** (H2/H3 hierarchy)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (contact form)
│   ├── blog/              # Blog listing and detail pages
│   ├── products/          # Product listing and detail pages
│   └── ...
├── components/            # React components
│   └── portable-text/    # Portable Text renderers
├── lib/                   # Utilities
│   └── sanity/           # Sanity client and queries
├── schemas/               # Sanity schemas
└── ...
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC



