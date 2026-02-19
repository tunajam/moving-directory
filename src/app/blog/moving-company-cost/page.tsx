import { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Moving Company Cost in 2026: By Move Type, Home Size & Services | MoverCompare',
  description:
    'What does a moving company cost? Local moves average $400–$2,500. Long distance runs $2,500–$10,000+. Full pricing by move type, home size, and packing services.',
  keywords:
    'moving company cost, cost of movers, moving costs, how much do moving companies charge, moving company prices',
  alternates: {
    canonical: 'https://movercompare.com/blog/moving-company-cost',
  },
  openGraph: {
    title: 'Moving Company Cost in 2026: By Move Type, Home Size & Services',
    description: 'Complete breakdown of moving company costs by move type, home size, and add-on services.',
    type: 'article',
    url: 'https://movercompare.com/blog/moving-company-cost',
  },
};

const COST_BY_TYPE = [
  { type: 'Local move (under 50 miles)', range: '$400–$2,500', pricing: 'Hourly ($80–$200/hr for 2–4 movers)', typical: '2-bedroom within same city' },
  { type: 'Intrastate (50–100 miles)', range: '$1,000–$4,000', pricing: 'Flat rate or hourly + travel', typical: 'City to suburbs or nearby town' },
  { type: 'Long distance (500+ miles)', range: '$2,500–$7,500', pricing: 'Weight-based ($0.50–$0.80/lb)', typical: '2-bedroom cross-state' },
  { type: 'Cross-country (1,500+ miles)', range: '$4,000–$10,000+', pricing: 'Weight-based + distance', typical: '3-bedroom coast-to-coast' },
  { type: 'International', range: '$3,000–$15,000+', pricing: 'Volume (cubic feet) or container', typical: 'Overseas relocation' },
];

const COST_BY_SIZE = [
  { size: 'Studio/1-bedroom', local: '$400–$800', longDist: '$1,500–$3,000', weight: '2,000–3,000 lbs' },
  { size: '2-bedroom', local: '$600–$1,500', longDist: '$2,500–$5,500', weight: '4,000–6,000 lbs' },
  { size: '3-bedroom', local: '$800–$2,200', longDist: '$3,500–$7,500', weight: '6,000–10,000 lbs' },
  { size: '4-bedroom', local: '$1,200–$3,000', longDist: '$5,000–$10,000', weight: '8,000–14,000 lbs' },
  { size: '5+ bedroom', local: '$1,500–$4,000+', longDist: '$7,000–$15,000+', weight: '12,000–18,000+ lbs' },
];

const PACKING_SERVICES = [
  { service: 'Full packing (everything)', cost: '$300–$2,000+', notes: 'Movers pack all boxes. Add 50–80% to base cost.' },
  { service: 'Partial packing (fragile items)', cost: '$150–$500', notes: 'Just dishes, art, electronics, mirrors.' },
  { service: 'Packing materials only', cost: '$50–$200', notes: 'Boxes, tape, paper, bubble wrap. You pack.' },
  { service: 'Specialty items (piano, antiques)', cost: '$200–$1,000/item', notes: 'Crating, custom wrapping, extra crew.' },
  { service: 'Unpacking at destination', cost: '$200–$1,500', notes: 'Often bundled with full packing at discount.' },
];

const CITY_PRICES = [
  { city: 'Houston, TX', slug: '/tx/houston', local: '$450–$1,200', longDist: '$2,200–$5,500' },
  { city: 'Los Angeles, CA', slug: '/ca/los-angeles', local: '$600–$1,800', longDist: '$3,000–$7,500' },
  { city: 'Chicago, IL', slug: '/il/chicago', local: '$500–$1,500', longDist: '$2,500–$6,000' },
  { city: 'Phoenix, AZ', slug: '/az/phoenix', local: '$450–$1,300', longDist: '$2,300–$5,500' },
  { city: 'Dallas, TX', slug: '/tx/dallas', local: '$450–$1,200', longDist: '$2,200–$5,500' },
  { city: 'Atlanta, GA', slug: '/ga/atlanta', local: '$500–$1,400', longDist: '$2,400–$6,000' },
  { city: 'Denver, CO', slug: '/co/denver', local: '$550–$1,500', longDist: '$2,500–$6,500' },
  { city: 'Miami, FL', slug: '/fl/miami', local: '$550–$1,600', longDist: '$2,800–$7,000' },
  { city: 'Seattle, WA', slug: '/wa/seattle', local: '$600–$1,700', longDist: '$3,000–$7,000' },
  { city: 'Nashville, TN', slug: '/tn/nashville', local: '$450–$1,200', longDist: '$2,200–$5,500' },
];

export default function MovingCompanyCostPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Moving Company Cost in 2026: By Move Type, Home Size & Services',
    description: 'Complete breakdown of moving company costs.',
    datePublished: '2026-02-19',
    dateModified: '2026-02-19',
    author: { '@type': 'Organization', name: 'MoverCompare' },
    publisher: { '@type': 'Organization', name: 'MoverCompare', url: 'https://movercompare.com' },
    mainEntityOfPage: 'https://movercompare.com/blog/moving-company-cost',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a moving company cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A local move costs $400–$2,500 depending on home size and hours. Long distance moves run $2,500–$10,000+ based on weight and distance. A typical 2-bedroom local move costs $600–$1,500, while the same home moving cross-country costs $4,000–$7,500.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are moving costs calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Local moves are typically charged hourly ($80–$200/hr for a crew of 2–4 movers). Long distance moves are based on the weight of your belongings plus distance. Add-ons like packing, specialty items, and storage are extra.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it worth hiring a moving company?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most moves, yes. Professional movers are 3–4x faster than DIY, have proper equipment and insurance, and handle heavy/fragile items safely. A DIY truck rental costs $200–$800 for local moves but takes 2–3x longer and risks injury or damage.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cheapest day to hire movers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mid-week (Tuesday–Thursday) and mid-month are cheapest. End-of-month, weekends, and summer (May–September) are peak season with the highest prices. Moving in January or February can save 20–30% compared to June or July.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do moving companies charge for packing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, packing is an add-on service. Full packing costs $300–$2,000+ depending on home size. Partial packing (fragile items only) runs $150–$500. You can save significantly by packing yourself — movers just move the boxes.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-medium mb-2">
            <Link href="/blog" className="hover:underline">← Blog</Link>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Moving Company Cost in 2026: By Move Type, Home Size &amp; Services
          </h1>
          <p className="text-white/60 mt-2 text-sm">February 19, 2026 · 10 min read</p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-3xl mx-auto mt-6 px-4" />

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-5 mb-8 not-prose">
          <p className="text-primary font-semibold mb-1">The short answer:</p>
          <p className="text-gray-700 m-0">
            A <strong>local move costs $400–$2,500</strong> and a <strong>long distance move costs $2,500–$10,000+</strong>. The biggest factors are distance, home size, and whether you add packing services. A 2-bedroom local move typically runs <strong>$600–$1,500</strong>.
          </p>
        </div>

        <p>
          Moving company pricing is notoriously opaque. Hourly rates, weight-based estimates, fuel surcharges, stair fees — it adds up fast if you&apos;re not paying attention. We broke down what people actually pay so you know what to expect before the first quote comes in.
        </p>

        <nav className="bg-gray-50 rounded-xl p-6 mb-10 not-prose">
          <h2 className="text-lg font-bold text-primary mb-3">In this guide:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li><a href="#by-type" className="text-accent hover:text-accent-dark">Cost by move type</a></li>
            <li><a href="#by-size" className="text-accent hover:text-accent-dark">Cost by home size</a></li>
            <li><a href="#packing" className="text-accent hover:text-accent-dark">Packing services pricing</a></li>
            <li><a href="#by-city" className="text-accent hover:text-accent-dark">Cost by city</a></li>
            <li><a href="#whats-included" className="text-accent hover:text-accent-dark">What&apos;s included in a quote</a></li>
            <li><a href="#faq" className="text-accent hover:text-accent-dark">FAQ</a></li>
          </ol>
        </nav>

        {/* By Type */}
        <h2 id="by-type">Moving Company Cost by Move Type</h2>
        <p>The type of move — local vs. long distance — determines how you&apos;re charged:</p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Move Type</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Typical Cost</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Pricing Model</th>
                <th className="text-left py-3 font-semibold text-primary">Example</th>
              </tr>
            </thead>
            <tbody>
              {COST_BY_TYPE.map((row) => (
                <tr key={row.type} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.type}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.range}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.pricing}</td>
                  <td className="py-3 text-gray-600 text-sm">{row.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>Local moves</strong> are hourly. You&apos;re paying for the crew&apos;s time from the moment they arrive to the moment the last box is off the truck. The clock runs while they wrap furniture, load, drive, unload, and set up.
        </p>
        <p>
          <strong>Long distance moves</strong> are weight-based. The moving company weighs the truck before and after loading. Every pound counts — that&apos;s why decluttering before a long-distance move saves real money.
        </p>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* By Size */}
        <h2 id="by-size">Moving Company Cost by Home Size</h2>
        <p>Bigger home = more stuff = higher cost. Here&apos;s the breakdown:</p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Home Size</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Local Move</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Long Distance</th>
                <th className="text-left py-3 font-semibold text-primary">Avg. Weight</th>
              </tr>
            </thead>
            <tbody>
              {COST_BY_SIZE.map((row) => (
                <tr key={row.size} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.size}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.local}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.longDist}</td>
                  <td className="py-3 text-gray-700">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          These assume standard household goods. If you have a piano ($200–$1,000 to move), a pool table ($300–$600), or a hot tub ($300–$1,000) — add those separately.
        </p>

        {/* Packing Services */}
        <h2 id="packing">Packing Services: What They Cost</h2>
        <p>
          Packing is the biggest add-on expense. It can add 30–80% to your base moving cost — but it also saves 4–8 hours of your time and reduces damage claims.
        </p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Service</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Cost</th>
                <th className="text-left py-3 font-semibold text-primary">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PACKING_SERVICES.map((row) => (
                <tr key={row.service} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.service}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.cost}</td>
                  <td className="py-3 text-gray-600 text-sm">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>Pro tip:</strong> If budget is tight, do the partial packing option — let movers handle fragile items (dishes, glassware, art, electronics) and pack everything else yourself. Best of both worlds.
        </p>

        {/* By City */}
        <h2 id="by-city">Moving Company Cost by City</h2>
        <p>Average costs for a 2-bedroom move:</p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">City</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Local Move</th>
                <th className="text-left py-3 font-semibold text-primary">Long Distance</th>
              </tr>
            </thead>
            <tbody>
              {CITY_PRICES.map((row) => (
                <tr key={row.city} className="border-b border-gray-200">
                  <td className="py-3 pr-3">
                    <Link href={row.slug} className="font-medium text-accent hover:text-accent-dark no-underline">
                      {row.city}
                    </Link>
                  </td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.local}</td>
                  <td className="py-3 font-semibold text-accent-dark">{row.longDist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <Link href="/" className="text-accent hover:text-accent-dark">Search your city on MoverCompare</Link> to see moving company prices in your area.
        </p>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* What's Included */}
        <h2 id="whats-included">What&apos;s Included in a Moving Company Quote</h2>
        <p>A standard moving quote should include:</p>
        <ul>
          <li><strong>Loading and unloading</strong> — the crew&apos;s time handling your belongings</li>
          <li><strong>Transportation</strong> — driving from Point A to Point B</li>
          <li><strong>Basic protection</strong> — released value coverage ($0.60/lb per item, which is basically nothing)</li>
          <li><strong>Equipment</strong> — dollies, blankets, straps, ramps</li>
        </ul>

        <p>What&apos;s typically <strong>NOT</strong> included:</p>
        <ul>
          <li>Packing and unpacking</li>
          <li>Specialty item handling (piano, antiques, safes)</li>
          <li>Long carry fees (if truck can&apos;t park within 75 feet)</li>
          <li>Stair fees ($50–$100 per flight)</li>
          <li>Elevator fees ($75–$150)</li>
          <li>Full-value protection insurance ($50–$300+)</li>
          <li>Storage-in-transit</li>
          <li>Tips (15–20% of the total bill is customary)</li>
        </ul>

        <p>
          For more on hidden fees and tipping, read our <Link href="/blog/how-much-do-movers-cost">complete movers cost guide</Link>.
        </p>

        {/* FAQ */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <div className="space-y-6 not-prose mb-8">
          <div>
            <h3 className="font-semibold text-primary">How much does a moving company cost?</h3>
            <p className="text-gray-700 mt-1">
              Local moves cost $400–$2,500 and long distance moves run $2,500–$10,000+. A typical 2-bedroom local move is $600–$1,500.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">How are moving costs calculated?</h3>
            <p className="text-gray-700 mt-1">
              Local moves are hourly ($80–$200/hr). Long distance moves are weight-based ($0.50–$0.80/lb) plus distance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Is it worth hiring a moving company?</h3>
            <p className="text-gray-700 mt-1">
              For most moves, yes. Pro movers are 3–4x faster, have proper equipment, and carry insurance. DIY saves money but takes much longer and risks injury.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">What is the cheapest day to hire movers?</h3>
            <p className="text-gray-700 mt-1">
              Mid-week (Tue–Thu) and mid-month. Avoid end-of-month, weekends, and summer. January/February can save 20–30% vs peak season.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Do moving companies charge for packing?</h3>
            <p className="text-gray-700 mt-1">
              Yes, packing is extra. Full packing costs $300–$2,000+ depending on home size. Pack yourself to save, or do partial packing for fragile items only.
            </p>
          </div>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">Compare Moving Company Prices in Your Area</h2>
          <p className="text-gray-600 mb-4">
            Find trusted local movers and get estimates.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Compare Movers Near You →
          </Link>
        </div>
      </section>
    </>
  );
}
