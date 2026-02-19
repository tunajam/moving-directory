import { MetadataRoute } from 'next';
import { getAllCompanies, getCities } from '@/lib/data';
import siteConfig from '../../site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteConfig.domain}`;
  const now = new Date();

  const cities = getCities().map((c) => ({
    url: `${baseUrl}/${c.state_slug}/${c.city_slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const companies = getAllCompanies().map((c) => ({
    url: `${baseUrl}/company/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    ...cities,
    ...companies,
  ];
}
