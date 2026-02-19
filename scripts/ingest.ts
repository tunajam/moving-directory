/**
 * Data Ingestion Script
 *
 * This script reads from a CSV or processes raw data into the companies.json format.
 * Customize this for your data source (Google Sheets, Airtable, CSV, web scraping, etc.)
 *
 * Usage:
 *   bun run ingest                     # or: npx tsx scripts/ingest.ts
 *   npx tsx scripts/ingest.ts --csv data/raw.csv
 *
 * Input CSV format (example):
 *   name,city,state,phone,website,address,description,services
 *   "Acme Co","Austin","Texas","(512) 555-0100","https://acme.com","123 Main","Great service","10:$250-$350|20:$350-$500"
 *
 * The "services" column uses pipe-separated "value:price_range" pairs.
 */

import fs from 'fs';
import path from 'path';

interface RawCompany {
  name: string;
  city: string;
  state: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  services?: string; // "10:$250-$350|20:$350-$500"
  verified?: string;
  pricing_estimated?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseCSV(content: string): RawCompany[] {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map((line) => {
    // Simple CSV parsing (handles quoted fields)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj as unknown as RawCompany;
  });
}

function processCompanies(raw: RawCompany[]) {
  return raw.map((r) => {
    const services = (r.services || '')
      .split('|')
      .filter(Boolean)
      .map((s) => {
        const [val, range] = s.split(':');
        return { value: parseInt(val), price_range: range || '' };
      })
      .filter((s) => !isNaN(s.value));

    return {
      name: r.name,
      slug: slugify(`${r.name}-${r.city}`),
      city: r.city,
      state: r.state,
      state_slug: slugify(r.state),
      city_slug: slugify(r.city),
      phone: r.phone || '',
      website: r.website || '',
      address: r.address || '',
      description: r.description || '',
      services,
      amenities: [],
      service_area_miles: 25,
      rating: 0,
      review_count: 0,
      verified: r.verified === 'true',
      pricing_estimated: r.pricing_estimated !== 'false',
    };
  });
}

// Also regenerate cities-index.json for the search box
function generateCitiesIndex(companies: ReturnType<typeof processCompanies>) {
  const seen = new Set<string>();
  const cities: { city: string; city_slug: string; state: string; state_slug: string }[] = [];

  for (const c of companies) {
    const key = `${c.state_slug}-${c.city_slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      cities.push({
        city: c.city,
        city_slug: c.city_slug,
        state: c.state,
        state_slug: c.state_slug,
      });
    }
  }
  return cities;
}

// ── Main ──────────────────────────────────────────────────
const args = process.argv.slice(2);
const csvFlag = args.indexOf('--csv');
const csvPath = csvFlag >= 0 ? args[csvFlag + 1] : null;

if (csvPath) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const raw = parseCSV(content);
  const companies = processCompanies(raw);

  const outPath = path.join(process.cwd(), 'data', 'companies.json');
  fs.writeFileSync(outPath, JSON.stringify(companies, null, 2));
  console.log(`✅ Wrote ${companies.length} companies to ${outPath}`);

  const citiesIndex = generateCitiesIndex(companies);
  const citiesPath = path.join(process.cwd(), 'src', 'lib', 'cities-index.json');
  fs.writeFileSync(citiesPath, JSON.stringify(citiesIndex, null, 2));
  console.log(`✅ Wrote ${citiesIndex.length} cities to ${citiesPath}`);
} else {
  console.log(`
Usage:
  npx tsx scripts/ingest.ts --csv data/raw.csv

CSV format:
  name,city,state,phone,website,address,description,services,verified,pricing_estimated
  "Acme Co","Austin","Texas","(512) 555-0100","https://acme.com","123 Main St","Great service","10:$250-$350|20:$350-$500","false","true"

The script outputs:
  - data/companies.json (company listings)
  - src/lib/cities-index.json (search autocomplete index)
  `);
}
