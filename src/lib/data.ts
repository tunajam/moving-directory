import fs from 'fs';
import path from 'path';

export interface ServiceTier {
  value: number;
  price_range: string;
}

export interface Company {
  name: string;
  slug: string;
  city: string;
  state: string;
  state_slug: string;
  city_slug: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  services: ServiceTier[];
  service_types: string[];
  amenities: string[];
  service_area_miles: number;
  rating: number;
  review_count: number;
  verified: boolean;
  pricing_estimated: boolean;
  licensed: boolean;
  insured: boolean;
  dot_number: string | null;
  years_in_business: number;
}

function loadCompanies(): Company[] {
  const filePath = path.join(process.cwd(), 'data', 'companies.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Company[];
}

const companies: Company[] = loadCompanies();

export function getAllCompanies(): Company[] {
  return companies;
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getCompaniesByCity(stateSlug: string, citySlug: string): Company[] {
  return companies.filter(
    (c) => c.state_slug === stateSlug && c.city_slug === citySlug
  );
}

export function getCities(): { city: string; city_slug: string; state: string; state_slug: string; count: number }[] {
  const cityMap = new Map<string, { city: string; city_slug: string; state: string; state_slug: string; count: number }>();
  for (const c of companies) {
    const key = `${c.state_slug}-${c.city_slug}`;
    if (cityMap.has(key)) {
      cityMap.get(key)!.count++;
    } else {
      cityMap.set(key, { city: c.city, city_slug: c.city_slug, state: c.state, state_slug: c.state_slug, count: 1 });
    }
  }
  return Array.from(cityMap.values());
}

export function getStates(): { state: string; state_slug: string; count: number }[] {
  const stateMap = new Map<string, { state: string; state_slug: string; count: number }>();
  for (const c of companies) {
    if (stateMap.has(c.state_slug)) {
      stateMap.get(c.state_slug)!.count++;
    } else {
      stateMap.set(c.state_slug, { state: c.state, state_slug: c.state_slug, count: 1 });
    }
  }
  return Array.from(stateMap.values()).sort((a, b) => a.state.localeCompare(b.state));
}
