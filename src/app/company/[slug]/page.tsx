import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCompanies, getCompanyBySlug } from '@/lib/data';
import { config, t } from '@/lib/config';
import QuoteForm from '@/components/QuoteForm';

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
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const isVerified = company.verified === true;
  const isPricingEstimated = company.pricing_estimated !== false;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.state,
    },
    ...(company.phone && { telephone: company.phone }),
    ...(company.website && { url: company.website }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
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
            <span>📍 {company.city}, {company.state}</span>
            {company.phone && <span>📞 {company.phone}</span>}
            {isVerified && (
              <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full text-xs font-medium">
                ✓ Verified Listing
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">About {company.name}</h2>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
            </div>

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
                  {company.name} serves customers in the <strong>{company.city}, {company.state}</strong> area.
                </p>
              </div>
            )}

            {/* Contact */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">Contact Info</h3>
                {company.address && <p className="text-sm text-gray-600">{company.address}</p>}
                {company.phone && (
                  <p className="text-sm text-gray-600 mt-1">
                    📞 <a href={`tel:${company.phone}`} className="text-accent-dark hover:underline">{company.phone}</a>
                  </p>
                )}
              </div>
              {company.website && (
                <div>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>

            {/* Claim Listing */}
            {!isVerified && (
              <div className="border-2 border-dashed border-accent/40 rounded-xl p-6 bg-accent/5 text-center">
                <h3 className="font-semibold text-primary text-lg mb-2">Is this your business?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Claim this listing to update your info, add real pricing, respond to quotes, and get a verified badge.
                </p>
                <a
                  href={`mailto:${config.contactEmail}?subject=Claim listing: ${company.name}&body=I'd like to claim the listing for ${company.name} in ${company.city}, ${company.state}.`}
                  className="inline-block px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Claim This Listing — It&apos;s Free
                </a>
              </div>
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
