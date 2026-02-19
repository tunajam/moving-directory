import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCompaniesByCity, getCities } from '@/lib/data';
import { config, t } from '@/lib/config';
import CityPageClient from './CityPageClient';
import AdSlot from '@/components/AdSlot';
import LeadCaptureForm from '@/components/LeadCaptureForm';

type Props = { params: Promise<{ state: string; city: string }> };

export async function generateStaticParams() {
  return getCities().map((c) => ({ state: c.state_slug, city: c.city_slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const companies = getCompaniesByCity(state, city);
  if (!companies.length) return {};
  const { city: cityName, state: stateName } = companies[0];
  return {
    title: t(config.seo.cityTitle, {
      city: cityName,
      state: stateName,
      count: companies.length,
      industry: config.industry.singular,
      industryPlural: config.industry.plural,
    }),
    description: t(config.seo.cityDescription, {
      city: cityName,
      state: stateName,
      count: companies.length,
      industry: config.industry.singular,
      industryPlural: config.industry.plural,
    }),
    openGraph: {
      images: [`https://${config.domain}/og/${state}/${city}`],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { state, city } = await params;
  const companies = getCompaniesByCity(state, city);
  if (!companies.length) notFound();

  const { city: cityName, state: stateName } = companies[0];

  // Compute aggregate rating across companies with ratings
  const ratedCompanies = companies.filter((c) => c.rating > 0 && c.review_count > 0);
  const avgRating = ratedCompanies.length
    ? Number((ratedCompanies.reduce((sum, c) => sum + c.rating, 0) / ratedCompanies.length).toFixed(1))
    : null;
  const totalReviews = ratedCompanies.reduce((sum, c) => sum + c.review_count, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${config.industry.singular} ${config.industry.companyNounPlural} in ${cityName}, ${stateName}`,
    itemListElement: companies.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
        name: c.name,
        ...(c.address && { address: c.address }),
        ...(c.phone && { telephone: c.phone }),
        url: `https://${config.domain}/company/${c.slug}`,
        areaServed: {
          '@type': 'City',
          name: cityName,
        },
        ...(c.rating > 0 && c.review_count > 0 && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: c.rating,
            reviewCount: c.review_count,
          },
        }),
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${config.domain}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: stateName,
        item: `https://${config.domain}/${state}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cityName}, ${stateName}`,
        item: `https://${config.domain}/${state}/${city}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent text-sm font-medium mb-2">
            ← <a href="/" className="hover:underline">Home</a> / {stateName}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {config.industry.plural} in {cityName}, {stateName}
          </h1>
          <p className="text-white/70 mt-2">
            Compare prices from {companies.length} local {companies.length === 1 ? config.industry.companyNoun : config.industry.companyNounPlural}
          </p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-5xl mx-auto mt-6 px-4" />

      <CityPageClient companies={companies} cityName={cityName} stateName={stateName} />

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LeadCaptureForm cityName={cityName} stateName={stateName} />
          </div>
          <div className="lg:col-span-1">
            <AdSlot position="sidebar" />
          </div>
        </div>
      </section>
    </>
  );
}
