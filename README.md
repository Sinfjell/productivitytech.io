# ProductivityTech.io

A content-first website built with Next.js, Sanity CMS, and Vercel. Designed to promote productivity tools, affiliate links, and your own SaaS products while capturing leads for consulting work.

## Features

- **SEO + GEO Optimized**: Structured content for search engines and AI answers
- **Affiliate Link Management**: Built-in support for affiliate links with proper disclosures
- **Product Pages**: First-class support for your SaaS products and Notion templates
- **Lead Capture**: Contact form that stores leads in Sanity and sends emails via Resend
- **Content Blocks**: Reusable CTA, affiliate, comparison, and product callout blocks
- **ISR (Incremental Static Regeneration)**: Fast, SEO-friendly pages with automatic updates every 60 seconds, plus instant updates via Sanity webhooks

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

# Revalidation (for Sanity webhooks)
# Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Or: openssl rand -hex 32
# This must match the header value in your Sanity webhook configuration (see webhook setup section)
REVALIDATION_SECRET=your_random_secret_string_here
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

### Setting Up Webhooks for On-Demand Revalidation

To enable instant content updates when you publish in Sanity (instead of waiting up to 60 seconds), you need to:

1. Generate a `REVALIDATION_SECRET` token
2. Add it to your environment variables
3. Configure a Sanity webhook

#### Step 1: Generate REVALIDATION_SECRET

**What is REVALIDATION_SECRET?**
This is a security token that prevents unauthorized access to your revalidation endpoint. When Sanity sends a webhook to your site, it includes this secret in the request headers. Your API route verifies the secret matches before revalidating pages. This prevents malicious actors from triggering expensive revalidation operations.

**How to generate it:**

You can generate a secure random string using any of these methods:

**Option A: Using Node.js (recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B: Using OpenSSL**
```bash
openssl rand -hex 32
```

**Option C: Using an online generator**
Visit https://randomkeygen.com/ and use a "CodeIgniter Encryption Keys" (256-bit) or generate a random string yourself.

**Example output:**
```
a3f8d9e2b1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1
```

**Important:** Copy this value - you'll need it in both Vercel and Sanity.

#### Step 2: Add REVALIDATION_SECRET to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`productivitytech.io` or whatever you named it)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Key**: `REVALIDATION_SECRET`
   - **Value**: Paste the secret you generated (e.g., `a3f8d9e2b1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1`)
   - **Environment**: Select all environments (Production, Preview, Development)
6. Click **Save**
7. **Important:** Redeploy your site for the environment variable to take effect:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on your latest deployment
   - Click **Redeploy**

#### Step 3: Configure Sanity Webhook

1. **Go to Sanity Manage:**
   - Visit https://sanity.io/manage
   - Log in if needed
   - Select your project (`g3aw9p5p`)

2. **Navigate to Webhooks:**
   - Click on **API** in the left sidebar
   - Click on **Webhooks** tab
   - Click the **Create webhook** button

3. **Configure the webhook form:**

   **Basic Settings:**
   - **Name**: `Content Revalidation` (or any descriptive name)
   - **URL**: `https://yourdomain.com/api/revalidate`
     - Replace `yourdomain.com` with your actual domain (e.g., `https://productivitytech.io/api/revalidate`)
     - **Important:** Use your production domain, not localhost
   - **Dataset**: Select `production`
   - **HTTP method**: Select `POST`

   **Trigger Settings:**
   - **Trigger on**: Check all three:
     - ☑ Create
     - ☑ Update  
     - ☑ Delete
   - **Filter** (optional but recommended):
     ```
     _type in ["post", "product", "category", "page"]
     ```
     This ensures the webhook only fires for content types that affect your site.

   **API Version:**
   - **API version**: Select `v2021-03-25` or later (latest available)

   **Projection (IMPORTANT):**
   - Click on **Projection** field
   - Paste this JSON:
     ```json
     {
       "_type": _type,
       "slug": slug
     }
     ```
     This tells Sanity to only send the document type and slug in the webhook payload, which is all we need for revalidation.

   **Secret Header (CRITICAL):**
   - Scroll down to find **HTTP Headers** or **Secret** section
   - Click **Add header** or **Add secret**
   - **Header name**: `x-sanity-revalidate-secret`
   - **Header value**: Paste the **exact same** `REVALIDATION_SECRET` value you added to Vercel
     - Example: `a3f8d9e2b1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1`
   - **Important:** The header name must be exactly `x-sanity-revalidate-secret` (lowercase, with hyphens)

4. **Save the webhook:**
   - Click **Create webhook** or **Save** button
   - You should see the webhook appear in your list

#### Step 4: Test the Webhook

1. **Test from Sanity:**
   - In Sanity Studio, edit and publish any blog post
   - Go back to Sanity Manage → API → Webhooks
   - Click on your webhook to see its details
   - Check the **Recent deliveries** section - you should see a successful delivery (green checkmark)

2. **Test from your site:**
   - Visit your site and check if the updated content appears
   - If webhook is working, content updates instantly
   - If webhook isn't configured, content updates within 60 seconds (ISR fallback)

3. **Debug if needed:**
   - Check Vercel logs: **Deployments** → Click deployment → **Functions** → `/api/revalidate`
   - Check Sanity webhook delivery logs for error messages
   - Verify `REVALIDATION_SECRET` matches exactly in both places (no extra spaces)

#### How It Works

1. You publish/update content in Sanity Studio
2. Sanity sends a POST request to `https://yourdomain.com/api/revalidate` with:
   - The document type (`_type`) and slug in the body
   - The `x-sanity-revalidate-secret` header with your secret
3. Your API route verifies the secret matches
4. Your API route revalidates the appropriate pages (e.g., `/blog/my-post`, `/blog`, `/`)
5. Next.js regenerates those pages with fresh content from Sanity
6. Visitors see the updated content immediately

**Without webhook:** Content updates every 60 seconds automatically (ISR)
**With webhook:** Content updates instantly when you publish in Sanity

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
3. Add environment variables in Vercel dashboard (see below)
4. Deploy!

The site uses **ISR (Incremental Static Regeneration)** with a 60-second revalidation interval. This means:
- Pages are pre-rendered at build time for fast performance
- Content automatically updates every 60 seconds in the background
- With webhooks configured, content updates instantly when published in Sanity
- No need to rebuild the entire site for content changes

### Environment Variables in Vercel

Make sure to add all environment variables from `.env.local` to your Vercel project settings:

- `SANITY_API_TOKEN` - For writing leads to Sanity
- `RESEND_API_KEY` - For sending contact form emails
- `RESEND_FROM_EMAIL` - Sender email address
- `RESEND_TO_EMAIL` - Recipient email address
- `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., `https://productivitytech.io`)
- `REVALIDATION_SECRET` - Random secret string for webhook authentication (generate a secure random string)

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
│   ├── api/               # API routes (contact form, revalidation webhook)
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

## Troubleshooting

### Webhook Not Working

**Symptoms:** Content doesn't update instantly after publishing in Sanity

**Solutions:**

1. **Check REVALIDATION_SECRET matches:**
   - Verify the secret in Vercel environment variables matches exactly (character-for-character) with the header value in Sanity webhook
   - No extra spaces, no line breaks
   - Case-sensitive

2. **Check webhook URL:**
   - Ensure URL is your production domain: `https://yourdomain.com/api/revalidate`
   - Not `http://localhost:3000` or a preview URL
   - Must be accessible from the internet (not behind a firewall)

3. **Check webhook delivery logs:**
   - Go to Sanity Manage → API → Webhooks
   - Click on your webhook
   - Check "Recent deliveries" section
   - Look for error messages (red X) or 401/500 status codes

4. **Check Vercel function logs:**
   - Go to Vercel → Your Project → Deployments
   - Click on latest deployment → Functions tab
   - Click on `/api/revalidate` function
   - Check logs for errors like "Invalid secret" or "Revalidation secret not configured"

5. **Verify environment variable is set:**
   - In Vercel, go to Settings → Environment Variables
   - Confirm `REVALIDATION_SECRET` exists and has a value
   - **Important:** After adding/updating env vars, you must redeploy

6. **Test webhook manually:**
   ```bash
   curl -X POST https://yourdomain.com/api/revalidate \
     -H "Content-Type: application/json" \
     -H "x-sanity-revalidate-secret: YOUR_SECRET_HERE" \
     -d '{"_type": "post", "slug": {"current": "test"}}'
   ```
   Should return: `{"revalidated": true, "paths": [...], "now": ...}`

### Contact Form Not Working

**Symptoms:** Contact form submissions fail or don't send emails

**Solutions:**

1. **Check RESEND_API_KEY is set** in Vercel environment variables
2. **Check email addresses** are valid in `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL`
3. **Verify Resend account** is active and has API access
4. **Check Vercel function logs** for `/api/contact` errors

### Content Updates Slowly

**Symptoms:** Content takes 60+ seconds to appear after publishing

**Solutions:**

1. **Webhook not configured:** Set up the Sanity webhook (see instructions above)
2. **Webhook failing:** Check troubleshooting steps above
3. **ISR working as designed:** Without webhook, ISR updates every 60 seconds - this is normal and expected

## License

ISC



