/**
 * Generate 500+ moving companies across 35+ US metros
 */
import fs from 'fs';
import path from 'path';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const METROS: { city: string; state: string; areaCode: string }[] = [
  { city: 'New York', state: 'New York', areaCode: '212' },
  { city: 'Los Angeles', state: 'California', areaCode: '213' },
  { city: 'Chicago', state: 'Illinois', areaCode: '312' },
  { city: 'Houston', state: 'Texas', areaCode: '713' },
  { city: 'Phoenix', state: 'Arizona', areaCode: '602' },
  { city: 'Philadelphia', state: 'Pennsylvania', areaCode: '215' },
  { city: 'San Antonio', state: 'Texas', areaCode: '210' },
  { city: 'San Diego', state: 'California', areaCode: '619' },
  { city: 'Dallas', state: 'Texas', areaCode: '214' },
  { city: 'Austin', state: 'Texas', areaCode: '512' },
  { city: 'Jacksonville', state: 'Florida', areaCode: '904' },
  { city: 'San Francisco', state: 'California', areaCode: '415' },
  { city: 'Columbus', state: 'Ohio', areaCode: '614' },
  { city: 'Charlotte', state: 'North Carolina', areaCode: '704' },
  { city: 'Indianapolis', state: 'Indiana', areaCode: '317' },
  { city: 'Seattle', state: 'Washington', areaCode: '206' },
  { city: 'Denver', state: 'Colorado', areaCode: '303' },
  { city: 'Nashville', state: 'Tennessee', areaCode: '615' },
  { city: 'Portland', state: 'Oregon', areaCode: '503' },
  { city: 'Las Vegas', state: 'Nevada', areaCode: '702' },
  { city: 'Memphis', state: 'Tennessee', areaCode: '901' },
  { city: 'Louisville', state: 'Kentucky', areaCode: '502' },
  { city: 'Baltimore', state: 'Maryland', areaCode: '410' },
  { city: 'Milwaukee', state: 'Wisconsin', areaCode: '414' },
  { city: 'Albuquerque', state: 'New Mexico', areaCode: '505' },
  { city: 'Tucson', state: 'Arizona', areaCode: '520' },
  { city: 'Atlanta', state: 'Georgia', areaCode: '404' },
  { city: 'Miami', state: 'Florida', areaCode: '305' },
  { city: 'Tampa', state: 'Florida', areaCode: '813' },
  { city: 'Orlando', state: 'Florida', areaCode: '407' },
  { city: 'Raleigh', state: 'North Carolina', areaCode: '919' },
  { city: 'Minneapolis', state: 'Minnesota', areaCode: '612' },
  { city: 'Kansas City', state: 'Missouri', areaCode: '816' },
  { city: 'Sacramento', state: 'California', areaCode: '916' },
  { city: 'St. Louis', state: 'Missouri', areaCode: '314' },
  { city: 'Pittsburgh', state: 'Pennsylvania', areaCode: '412' },
  { city: 'Cincinnati', state: 'Ohio', areaCode: '513' },
  { city: 'Cleveland', state: 'Ohio', areaCode: '216' },
  { city: 'Salt Lake City', state: 'Utah', areaCode: '801' },
  { city: 'San Jose', state: 'California', areaCode: '408' },
  { city: 'Richmond', state: 'Virginia', areaCode: '804' },
  { city: 'Boise', state: 'Idaho', areaCode: '208' },
  { city: 'Oklahoma City', state: 'Oklahoma', areaCode: '405' },
  { city: 'New Orleans', state: 'Louisiana', areaCode: '504' },
  { city: 'Detroit', state: 'Michigan', areaCode: '313' },
];

const PREFIXES = [
  'All American', 'Swift', 'Eagle', 'Pro', 'Premier', 'Elite', 'United',
  'First Choice', 'Reliable', 'Express', 'Golden State', 'Metro',
  'Affordable', 'Quality', 'National', 'City', 'Safe', 'Fast',
  'Precision', 'A-1', 'Top Notch', 'Smooth', 'Careful', 'Budget',
  'Trusted', 'Great Plains', 'Hometown', 'Friendly', 'Atlas',
  'Priority', 'Apex', 'Summit', 'Blue Ribbon', 'Champion', 'Liberty',
];

const SUFFIXES = [
  'Moving & Storage', 'Movers', 'Moving Co.', 'Relocations', 'Van Lines',
  'Moving Services', 'Transport', 'Moving', 'Moving Group', 'Hauling & Moving',
  'Moving Solutions', 'Moving Pros', 'Move Team',
];

const STREETS = [
  'Main St', 'Oak Ave', 'Elm St', 'Commerce Dr', 'Industrial Blvd',
  'Business Park Dr', 'Highway 1', 'Market St', 'Pine Rd', 'Maple Ave',
  'Cedar Ln', 'Warehouse Dr', 'Logistics Way', 'Transport Blvd',
];

const SERVICE_TYPES = ['local', 'long-distance', 'commercial', 'residential', 'packing', 'storage'];

const DESCRIPTIONS = [
  'family-owned moving company serving the {city} metro area for over {years} years. We specialize in {specialties} and take pride in handling your belongings with care.',
  'full-service moving company in {city}. From packing and loading to transport and unpacking, we handle every detail of your move. Licensed, insured, and ready to help.',
  'trusted mover in {city}, {state}. Whether you\'re moving across town or across the country, our experienced team ensures a smooth, stress-free relocation.',
  'professional movers based in {city}. We offer competitive rates for {specialties} moves with no hidden fees. Free estimates available.',
  'locally owned moving company providing {city} residents with dependable, affordable moving services. Our trained crews handle everything from apartments to large homes.',
  'experienced moving professionals in {city}, {state}. We\'re licensed and insured with a track record of on-time deliveries and careful handling.',
  'one of {city}\'s most trusted moving companies. We provide {specialties} services with transparent pricing and a satisfaction guarantee.',
  'reliable movers serving {city} and surrounding areas. From single items to full household moves, we\'ve got the equipment and expertise.',
];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function genPhone(areaCode: string): string {
  return `(${areaCode}) ${rand(200, 999)}-${String(rand(1000, 9999))}`;
}

function genServices(): { value: number; price_range: string }[] {
  const services = [];
  // Most companies offer studio/1BR
  if (Math.random() > 0.1) services.push({ value: 1, price_range: `$${rand(3, 8) * 100}–$${rand(6, 12) * 100}` });
  // Most offer 2-3BR
  if (Math.random() > 0.05) services.push({ value: 2, price_range: `$${rand(8, 15) * 100}–$${rand(18, 30) * 100}` });
  // Many offer 4+BR
  if (Math.random() > 0.2) services.push({ value: 4, price_range: `$${rand(20, 35) * 100}–$${rand(40, 60) * 100}` });
  // Some offer long-distance
  if (Math.random() > 0.4) services.push({ value: 5, price_range: `$${rand(30, 50) * 100}–$${rand(60, 120) * 100}` });
  if (services.length === 0) services.push({ value: 1, price_range: '$400–$800' });
  return services;
}

function genServiceTypes(): string[] {
  const types: string[] = [];
  if (Math.random() > 0.1) types.push('local');
  if (Math.random() > 0.3) types.push('long-distance');
  if (Math.random() > 0.4) types.push('commercial');
  if (Math.random() > 0.1) types.push('residential');
  if (Math.random() > 0.3) types.push('packing');
  if (Math.random() > 0.4) types.push('storage');
  if (types.length === 0) types.push('local', 'residential');
  return types;
}

const usedNames = new Set<string>();
const companies: any[] = [];

for (const metro of METROS) {
  const count = rand(10, 16); // 10-16 companies per metro
  for (let i = 0; i < count; i++) {
    let name = '';
    let attempts = 0;
    while (attempts < 50) {
      const useCity = Math.random() > 0.6;
      const prefix = useCity ? metro.city : pick(PREFIXES);
      const suffix = pick(SUFFIXES);
      name = `${prefix} ${suffix}`;
      if (!usedNames.has(name)) break;
      attempts++;
    }
    usedNames.add(name);

    const serviceTypes = genServiceTypes();
    const specialties = serviceTypes.slice(0, 2).join(' and ');
    const years = rand(5, 35);
    const descTemplate = pick(DESCRIPTIONS);
    const description = descTemplate
      .replace(/{city}/g, metro.city)
      .replace(/{state}/g, metro.state)
      .replace(/{years}/g, String(years))
      .replace(/{specialties}/g, specialties);

    const hasLicense = Math.random() > 0.2;
    const hasInsurance = Math.random() > 0.15;
    const hasDotNumber = hasLicense && Math.random() > 0.3;

    companies.push({
      name,
      slug: slugify(`${name}-${metro.city}`),
      city: metro.city,
      state: metro.state,
      state_slug: slugify(metro.state),
      city_slug: slugify(metro.city),
      phone: genPhone(metro.areaCode),
      website: `https://www.${slugify(name)}.com`,
      address: `${rand(100, 9999)} ${pick(STREETS)}, ${metro.city}, ${metro.state}`,
      description: name + ' is a ' + description,
      services: genServices(),
      service_types: serviceTypes,
      amenities: [
        ...(hasLicense ? ['Licensed'] : []),
        ...(hasInsurance ? ['Insured'] : []),
        ...(hasDotNumber ? [`USDOT #${rand(100000, 9999999)}`] : []),
        ...(Math.random() > 0.5 ? ['Free Estimates'] : []),
        ...(Math.random() > 0.6 ? ['Senior Discount'] : []),
        ...(Math.random() > 0.5 ? ['Packing Supplies'] : []),
        ...(Math.random() > 0.7 ? ['Piano Moving'] : []),
        ...(Math.random() > 0.7 ? ['Climate-Controlled Storage'] : []),
      ],
      service_area_miles: rand(15, 100),
      rating: Number((rand(35, 50) / 10).toFixed(1)),
      review_count: rand(5, 350),
      verified: Math.random() > 0.85,
      pricing_estimated: true,
      licensed: hasLicense,
      insured: hasInsurance,
      dot_number: hasDotNumber ? `USDOT #${rand(100000, 9999999)}` : null,
      years_in_business: years,
    });
  }
}

// Write companies
const outPath = path.join(process.cwd(), 'data', 'companies.json');
fs.writeFileSync(outPath, JSON.stringify(companies, null, 2));
console.log(`✅ Generated ${companies.length} companies across ${METROS.length} metros`);

// Write cities index
const seen = new Set<string>();
const citiesIndex: any[] = [];
for (const c of companies) {
  const key = `${c.state_slug}-${c.city_slug}`;
  if (!seen.has(key)) {
    seen.add(key);
    citiesIndex.push({ city: c.city, city_slug: c.city_slug, state: c.state, state_slug: c.state_slug });
  }
}
const citiesPath = path.join(process.cwd(), 'src', 'lib', 'cities-index.json');
fs.writeFileSync(citiesPath, JSON.stringify(citiesIndex, null, 2));
console.log(`✅ Generated ${citiesIndex.length} cities index`);
