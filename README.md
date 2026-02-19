# Directory Site Template

A reusable Next.js template for local service directory sites. Clone it, edit one config file, add your data, and deploy.

Built from the [DumpsterCompare](https://dumpstercompare.com) codebase. Works for any local service industry: junk removal, roofing, moving companies, plumbers, landscapers, etc.

## What You Get

- **City pages** with dynamic routes, SEO metadata, and JSON-LD structured data
- **Company listing pages** with pricing tables, quote request CTAs, and "claim your listing" prompts
- **Blog & guides** content pattern for SEO long-tail traffic
- **Search autocomplete** across all cities
- **Service filtering** (by size/tier/package — configurable)
- **Quote request form** with email notifications via Resend
- **Sitemap** auto-generated from data
- **PostHog analytics** (optional)

## Launch a New Directory in Under an Hour

### 1. Copy the template (2 min)

```bash
cp -r directory-template my-new-directory
cd my-new-directory
bun install  # or: npm install
```

### 2. Edit `site.config.ts` (10 min)

This is the only file you *must* edit. Everything reads from it:

- **`name`** — Your site name (e.g. "RoofCompare")
- **`domain`** — Your domain
- **`industry`** — Singular/plural names, company noun
- **`serviceOptions`** — The filterable tiers (sizes, packages, service levels)
- **`theme`** — Primary + accent colors
- **`hero`** — Heading, subheading, search placeholder
- **`seo`** — Title/description templates with `{city}`, `{state}`, `{count}` variables
- **`steps`** — How-it-works section

### 3. Add your data (20 min)

**Option A: Manual JSON**
Edit `data/companies.json` directly. Each company needs:
```json
{
  "name": "Acme Roofing",
  "slug": "acme-roofing-austin",
  "city": "Austin", "state": "Texas",
  "state_slug": "texas", "city_slug": "austin",
  "phone": "(512) 555-0100",
  "website": "https://acmeroofing.com",
  "address": "123 Main St, Austin, TX",
  "description": "Top-rated roofing company...",
  "services": [
    { "value": 1, "price_range": "$5,000–$8,000" },
    { "value": 2, "price_range": "$8,000–$15,000" }
  ],
  "amenities": ["Free Estimates"],
  "service_area_miles": 30,
  "rating": 4.7, "review_count": 89,
  "verified": false,
  "pricing_estimated": true
}
```

**Option B: CSV import**
```bash
bun run ingest -- --csv data/raw.csv
```

CSV format: `name,city,state,phone,website,address,description,services,verified,pricing_estimated`

The `services` column uses pipe-separated `value:price_range` pairs:
`1:$5000-$8000|2:$8000-$15000`

### 4. Update the cities index (1 min)

If you edited JSON manually, regenerate the search index:
```bash
# The ingest script does this automatically.
# For manual edits, just make sure src/lib/cities-index.json
# lists all unique city/state combos from your data.
```

### 5. Update theme colors in CSS (2 min)

Edit `src/app/globals.css` — the `@theme inline` block should match your `site.config.ts` theme colors.

### 6. Add blog content (10 min)

- Edit `src/app/blog/page.tsx` POSTS array
- Duplicate `src/app/blog/example-post/page.tsx` for each article
- Same pattern for guides in `src/app/guides/`

### 7. Set up notifications (5 min)

For quote request emails:
1. Sign up at [resend.com](https://resend.com)
2. Add your domain
3. Set `RESEND_API_KEY` in `.env.local`

### 8. Deploy (5 min)

```bash
# Vercel (recommended)
npx vercel

# Or build locally
bun run build && bun run start
```

## Project Structure

```
site.config.ts              ← THE config file (edit this)
data/companies.json         ← Company listings data
scripts/ingest.ts           ← CSV → JSON converter
src/
  app/
    page.tsx                ← Homepage (hero, cities, guide)
    layout.tsx              ← Root layout (header/footer/analytics)
    sitemap.ts              ← Auto-generated sitemap
    [state]/[city]/         ← City pages (dynamic routes)
      page.tsx              ← Server: metadata + structured data
      CityPageClient.tsx    ← Client: filtering + sorting
    company/[slug]/         ← Company detail pages
      page.tsx              ← Pricing table, quote form, claim CTA
    blog/                   ← Blog index + posts
    guides/                 ← Guides index + articles
    api/quote/              ← Quote request API (→ email notification)
  components/
    Header.tsx              ← Site header (reads config)
    Footer.tsx              ← Site footer (popular cities)
    SearchBox.tsx           ← City search with autocomplete
    CompanyCard.tsx         ← Company listing card
    QuoteForm.tsx           ← Quote request form
    ServiceFilter.tsx       ← Filter by service tier
  lib/
    config.ts               ← Config helpers + template interpolation
    data.ts                 ← Data access layer (reads companies.json)
    cities-index.json       ← Search autocomplete index
```

## Customization Beyond Config

- **Add fields to companies**: Edit the `Company` interface in `src/lib/data.ts`
- **Change the pricing table**: Edit `src/app/company/[slug]/page.tsx`
- **Add a new page type**: Create a new route in `src/app/`
- **Swap notification provider**: Edit `src/app/api/quote/route.ts`
- **Add reviews/ratings UI**: The data model already has `rating` and `review_count`

## Tech Stack

- **Next.js 16** (App Router, static generation)
- **Tailwind CSS 4**
- **TypeScript**
- **No database** — flat JSON file, scales to thousands of listings
- **Resend** for transactional email (optional)
- **PostHog** for analytics (optional)
