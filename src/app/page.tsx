import Link from 'next/link';
import { getCities } from '@/lib/data';
import { config, t } from '@/lib/config';
import SearchBox from '@/components/SearchBox';

export default function HomePage() {
  const cities = getCities();
  const industry = config.industry.singular;
  const industryPlural = config.industry.plural;

  const headingLines = t(config.hero.heading, { industry, industryPlural }).split('\n');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            {headingLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === headingLines.length - 1 ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {config.hero.subheading}
          </p>
          <SearchBox />
          <p className="text-sm text-white/50 mt-4">
            Currently serving {cities.length} cities • {cities.reduce((a, c) => a + c.count, 0)}+ providers listed
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Cities */}
      <section id="cities" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">Browse by City</h2>
          <p className="text-center text-gray-600 mb-10">Find {industryPlural.toLowerCase()} in your area</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((c) => (
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

      {/* Service Guide */}
      <section id="sizes" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">{config.serviceOptions.label} Guide</h2>
          <p className="text-center text-gray-600 mb-10">Not sure what you need? Here&apos;s a quick reference.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.serviceOptions.options.map((opt) => (
              <div key={opt.value} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-1">{opt.value}</div>
                <div className="text-sm font-medium text-primary mb-3">{config.serviceOptions.unit}</div>
                <p className="text-sm text-gray-600 mb-2">{opt.description}</p>
                <p className="text-xs text-gray-400">{opt.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Find the Best Deal?</h2>
          <p className="text-white/70 mb-8">
            Compare prices, read reviews, and get quotes — all in one place.
          </p>
          <SearchBox />
        </div>
      </section>
    </>
  );
}
