import Link from 'next/link';
import { getCities, getStates } from '@/lib/data';
import { config, t } from '@/lib/config';
import SearchBox from '@/components/SearchBox';
import { MagnifyingGlass, ChartBar, Receipt, Truck, Buildings, Package } from '@phosphor-icons/react/dist/ssr';

export default function HomePage() {
  const cities = getCities();
  const states = getStates();
  const industry = config.industry.singular;
  const industryPlural = config.industry.plural;

  const headingLines = t(config.hero.heading, { industry, industryPlural }).split('\n');

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: `https://${config.domain}`,
    description: config.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://${config.domain}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${config.domain}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {headingLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === headingLines.length - 1 ? (
                  <span className="text-accent">{line}</span>
                ) : line}
              </span>
            ))}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {config.hero.subheading}
          </p>
          <SearchBox />
          <p className="text-sm text-white/50 mt-4">
            Currently serving {cities.length} cities • {cities.reduce((a, c) => a + c.count, 0)}+ movers listed
          </p>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">Moving Services We Cover</h2>
          <p className="text-center text-gray-600 mb-10">Find the right mover for any type of move</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 text-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} weight="duotone" />
              </div>
              <h3 className="font-semibold text-lg text-primary mb-2">Local Moving</h3>
              <p className="text-sm text-gray-600">Same-city and short-distance moves. Hourly or flat-rate pricing from licensed movers.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 text-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={28} weight="duotone" />
              </div>
              <h3 className="font-semibold text-lg text-primary mb-2">Long-Distance</h3>
              <p className="text-sm text-gray-600">Interstate and cross-country moves with USDOT-licensed carriers. Full tracking included.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 text-accent-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Buildings size={28} weight="duotone" />
              </div>
              <h3 className="font-semibold text-lg text-primary mb-2">Commercial</h3>
              <p className="text-sm text-gray-600">Office relocations, warehouse moves, and corporate moving with minimal downtime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.steps.map((step, i) => {
              const icons = [
                <MagnifyingGlass key="search" size={28} weight="bold" />,
                <ChartBar key="compare" size={28} weight="bold" />,
                <Receipt key="quote" size={28} weight="bold" />,
              ];
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {icons[i]}
                  </div>
                  <h3 className="font-semibold text-lg text-primary mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section id="cities" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">Browse by State</h2>
          <p className="text-center text-gray-600 mb-10">Find moving companies in your state</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
            {states.map((s) => (
              <div key={s.state_slug} className="p-3 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-primary text-sm">{s.state}</h3>
                <p className="text-xs text-gray-500">{s.count} movers</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-primary mb-4">Browse by City</h2>
          <p className="text-center text-gray-600 mb-10">Find {industryPlural.toLowerCase()} in your area</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.sort((a, b) => b.count - a.count).map((c) => (
              <Link
                key={`${c.state_slug}-${c.city_slug}`}
                href={`/${c.state_slug}/${c.city_slug}`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-accent/50 transition-all group"
              >
                <div>
                  <h3 className="font-semibold text-primary group-hover:text-accent-dark transition-colors">
                    {c.city}, {c.state}
                  </h3>
                  <p className="text-sm text-gray-500">{c.count} {c.count === 1 ? config.industry.companyNoun : config.industry.companyNounPlural} listed</p>
                </div>
                <span className="text-gray-400 group-hover:text-accent transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Move Size Guide */}
      <section id="sizes" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">{config.serviceOptions.label} Guide</h2>
          <p className="text-center text-gray-600 mb-10">Not sure what you need? Here&apos;s a quick reference.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.serviceOptions.options.map((opt) => (
              <div key={opt.value} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-lg font-bold text-primary mb-1">{opt.label} {config.serviceOptions.unit}</div>
                <p className="text-sm text-gray-600 mb-2">{opt.description}</p>
                <p className="text-sm font-semibold text-accent">{opt.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get Free Moving Quotes</h2>
          <p className="text-white/70 mb-8">
            Compare prices, read reviews, and get quotes from trusted local movers — all in one place.
          </p>
          <SearchBox />
        </div>
      </section>
    </>
  );
}
