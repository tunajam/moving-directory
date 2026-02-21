import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCompanies, getCompanyBySlug } from '@/lib/data';
import { config, t } from '@/lib/config';
import QuoteForm from '@/components/QuoteForm';
import ClaimListingForm from '@/components/ClaimListingForm';
import AdSlot from '@/components/AdSlot';
import { MapPin, Phone, SealCheck, Shield, Certificate, Truck, Package, Buildings, Warehouse, Globe, Clock } from '@phosphor-icons/react/dist/ssr';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return {};
  return {
    title: t(config.seo.companyTitle, {
      companyName: company.name,
      city: company.city,
      state: company.state,
      industry: config.industry.singular,
    }),
    description: t(config.seo.companyDescription, {
      companyName: company.name,
      city: company.city,
      state: company.state,
      industry: config.industry.singular,
    }),
    openGraph: {
      images: [`https://${config.domain}/og/${company.slug}`],
    },
  };
}

const SERVICE_TYPE_INFO: Record<string, { icon: React.ReactNode; label: string }> = {
  local: { icon: <Truck size={16} weight="bold" />, label: 'Local Moving' },
  'long-distance': { icon: <Truck size={16} weight="bold" />, label: 'Long-Distance' },
  commercial: { icon: <Buildings size={16} weight="bold" />, label: 'Commercial' },
  residential: { icon: <Package size={16} weight="bold" />, label: 'Residential' },
  packing: { icon: <Package size={16} weight="bold" />, label: 'Packing Services' },
  storage: { icon: <Warehouse size={16} weight="bold" />, label: 'Storage' },
};

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const isVerified = company.verified === true;
  const isPricingEstimated = company.pricing_estimated !== false;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: company.name,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.state,
    },
    ...(company.phone && { telephone: company.phone }),
    ...(company.website && { url: company.website }),
    areaServed: { '@type': 'City', name: company.city },
    ...(company.rating > 0 && company.review_count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: company.rating,
        reviewCount: company.review_count,
      },
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${config.domain}` },
      { '@type': 'ListItem', position: 2, name: `${company.city}, ${company.state}`, item: `https://${config.domain}/${company.state_slug}/${company.city_slug}` },
      { '@type': 'ListItem', position: 3, name: company.name, item: `https://${config.domain}/company/${company.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb + Header */}
      <section className="bg-primary text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent text-sm font-medium mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            {' / '}
            <Link href={`/${company.state_slug}/${company.city_slug}`} className="hover:underline">
              {company.city}, {company.state}
            </Link>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">{company.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-white/70 text-sm flex-wrap">
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} weight="fill" /> {company.city}, {company.state}
            </span>
            {company.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone size={14} weight="fill" /> {company.phone}
              </span>
            )}
            {isVerified && (
              <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1">
                <SealCheck size={12} weight="fill" /> Verified
              </span>
            )}
          </div>
        </div>
      </section>

      <AdSlot position="top" className="max-w-5xl mx-auto mt-6 px-4" />

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">About {company.name}</h2>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
            </div>

            {/* License & Insurance Badges */}
            <div className="flex flex-wrap gap-3">
              {company.licensed && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                  <Certificate size={20} weight="bold" className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Licensed</p>
                    <p className="text-xs text-blue-600">State-licensed mover</p>
                  </div>
                </div>
              )}
              {company.insured && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                  <Shield size={20} weight="bold" className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Insured</p>
                    <p className="text-xs text-green-600">Full liability coverage</p>
                  </div>
                </div>
              )}
              {company.dot_number && (
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg">
                  <Truck size={20} weight="bold" className="text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-purple-800">{company.dot_number}</p>
                    <p className="text-xs text-purple-600">Federal motor carrier</p>
                  </div>
                </div>
              )}
              {company.years_in_business > 0 && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
                  <Clock size={20} weight="bold" className="text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">{company.years_in_business}+ Years</p>
                    <p className="text-xs text-amber-600">In business</p>
                  </div>
                </div>
              )}
            </div>

            {/* Service Types */}
            {company.service_types?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">Services Offered</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {company.service_types.map((type) => {
                    const info = SERVICE_TYPE_INFO[type];
                    if (!info) return null;
                    return (
                      <div key={type} className="flex items-center gap-2 bg-accent/5 border border-accent/20 p-3 rounded-lg">
                        <span className="text-accent-dark">{info.icon}</span>
                        <span className="text-sm font-medium text-primary">{info.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing Table */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl font-semibold text-primary">{config.serviceOptions.label} & Pricing</h2>
                {isPricingEstimated && (
                  <span className="bg-accent/10 text-accent-dark border border-accent/30 px-2 py-0.5 rounded-full text-xs font-medium">
                    Estimated
                  </span>
                )}
              </div>
              {isPricingEstimated && (
                <p className="text-sm text-gray-500 mb-3 italic">
                  Prices shown are estimated market ranges for {company.city}. Contact the company for exact quotes.
                </p>
              )}
              <div className="border border-gray-200 rounded-xl overflow-x-auto">
                <table className="w-full min-w-0">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">{config.serviceOptions.label}</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">
                        {isPricingEstimated ? 'Est. Price Range' : 'Price Range'}
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 hidden sm:table-cell">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.services.map((s, i) => {
                      const optConfig = config.serviceOptions.options.find((o) => o.value === s.value);
                      return (
                        <tr key={s.value} className={i % 2 ? 'bg-gray-50' : ''}>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-primary">
                              {optConfig?.label || s.value} {config.serviceOptions.unit}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`font-semibold ${isPricingEstimated ? 'text-gray-600' : 'text-accent-dark'}`}>
                              {s.price_range}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">
                            {optConfig?.description || ''}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Area */}
            {company.service_area_miles > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">Service Area</h2>
                <p className="text-gray-700">
                  {company.name} serves customers within <strong>{company.service_area_miles} miles</strong> of <strong>{company.city}, {company.state}</strong>.
                </p>
              </div>
            )}

            {/* Contact */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">Contact Info</h3>
                {company.address && <p className="text-sm text-gray-600">{company.address}</p>}
                {company.phone && (
                  <p className="text-sm text-gray-600 mt-1 inline-flex items-center gap-1">
                    <Phone size={14} weight="fill" className="text-gray-400" />
                    <a href={`tel:${company.phone}`} className="text-accent-dark hover:underline">{company.phone}</a>
                  </p>
                )}
              </div>
              {company.website && (
                <div>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
                  >
                    <Globe size={16} weight="bold" /> Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Claim Listing */}
            {!isVerified && (
              <ClaimListingForm companyName={company.name} companySlug={company.slug} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuoteForm companyName={company.name} companySlug={company.slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
