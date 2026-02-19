import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://movercompare.com';

interface CityEntry {
  city_slug: string;
  state_slug: string;
}

interface CompanyEntry {
  slug: string;
  state_slug: string;
  city_slug: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const companies: CompanyEntry[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'companies.json'), 'utf-8')
  );

  // Derive unique cities from companies
  const citySet = new Map<string, CityEntry>();
  for (const co of companies) {
    const key = `${co.state_slug}-${co.city_slug}`;
    if (!citySet.has(key)) {
      citySet.set(key, { city_slug: co.city_slug, state_slug: co.state_slug });
    }
  }
  const citiesIndex = Array.from(citySet.values());

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = ["cheap-movers-near-me", "example-post", "how-much-do-movers-cost", "moving-company-cost"].map((slug: string) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = [].map((slug: string) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = citiesIndex.map((c: CityEntry) => ({
    url: `${BASE_URL}/${c.state_slug}/${c.city_slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Company pages
  const companyPages: MetadataRoute.Sitemap = companies.map((co: CompanyEntry) => ({
    url: `${BASE_URL}/company/${co.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...blogPosts,
    ...guidePages,
    ...cityPages,
    ...companyPages,
  ];
}
