'use client';

import { useState } from 'react';
import { Company } from '@/lib/data';
import { config } from '@/lib/config';
import CompanyCard from '@/components/CompanyCard';
import ServiceFilter from '@/components/ServiceFilter';

export default function CityPageClient({
  companies,
  cityName,
  stateName,
}: {
  companies: Company[];
  cityName: string;
  stateName: string;
}) {
  const [serviceFilter, setServiceFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const filtered = companies
    .filter((c) => !serviceFilter || c.services.some((s) => s.value === serviceFilter))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const priceA = parseInt(a.services[0]?.price_range.replace(/[^0-9]/g, '') || '0');
      const priceB = parseInt(b.services[0]?.price_range.replace(/[^0-9]/g, '') || '0');
      return priceA - priceB;
    });

  const noun = filtered.length === 1 ? config.industry.companyNoun : config.industry.companyNounPlural;

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <ServiceFilter selected={serviceFilter} onChange={setServiceFilter} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-white"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Est. Price (Low→High)</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No {config.industry.companyNounPlural} found with that filter in {cityName}, {stateName}.</p>
            <button onClick={() => setServiceFilter(null)} className="text-accent-dark hover:underline mt-2">
              Clear filter
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {filtered.length} {noun} in {cityName}, {stateName}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((c) => (
                <CompanyCard key={c.slug} company={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
