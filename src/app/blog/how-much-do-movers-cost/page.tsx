import { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'How Much Do Movers Cost? Hourly Rates, Flat Rates & Hidden Fees (2026) | MoverCompare',
  description:
    'Movers charge $25–$50/hr per mover for local moves and flat rates of $2,500–$10,000+ for long distance. Full breakdown of hourly rates, flat rates, hidden fees, and tipping guide.',
  keywords:
    'how much do movers cost, mover cost, moving rates, movers hourly rate, cost of movers per hour',
  alternates: {
    canonical: 'https://movercompare.com/blog/how-much-do-movers-cost',
  },
  openGraph: {
    title: 'How Much Do Movers Cost? Hourly Rates, Flat Rates & Hidden Fees',
    description: 'Everything you need to know about moving costs — hourly rates, flat rates, fees, and tips.',
    type: 'article',
    url: 'https://movercompare.com/blog/how-much-do-movers-cost',
  },
};

const HOURLY_RATES = [
  { crew: '2 movers + truck', hourlyRate: '$80–$120/hr', typical4hr: '$320–$480', bestFor: 'Studio, 1-bedroom' },
  { crew: '3 movers + truck', hourlyRate: '$120–$170/hr', typical4hr: '$480–$680', bestFor: '2-bedroom' },
  { crew: '4 movers + truck', hourlyRate: '$160–$220/hr', typical4hr: '$640–$880', bestFor: '3-bedroom' },
  { crew: '5+ movers + truck', hourlyRate: '$200–$300/hr', typical4hr: '$800–$1,200', bestFor: '4+ bedroom' },
];

const FLAT_VS_HOURLY = [
  { factor: 'Pricing', hourly: 'Pay for actual time used', flat: 'Fixed price regardless of time' },
  { factor: 'Best for', hourly: 'Local moves, small apartments', flat: 'Long distance, large homes' },
  { factor: 'Risk', hourly: 'Movers work slowly = you pay more', flat: 'May overpay if move is quick' },
  { factor: 'Predictability', hourly: 'Hard to predict final cost', flat: 'Know the price upfront' },
  { factor: 'Incentive', hourly: 'Movers may stretch hours', flat: 'Movers incentivized to finish fast' },
  { factor: 'When to choose', hourly: 'Short, simple local moves', flat: 'Anything over 2 hours or long distance' },
];

const HIDDEN_FEES = [
  { fee: 'Stair fee', cost: '$50–$100/flight', detail: 'Charged per flight at origin AND destination. Third-floor walkup = $200–$400 extra.' },
  { fee: 'Long carry fee', cost: '$50–$150', detail: 'If the truck can\'t park within 75 feet of your door. Common in cities with no driveway.' },
  { fee: 'Elevator fee', cost: '$75–$150', detail: 'High-rise buildings with elevator-only access. Some charge per hour of elevator use.' },
  { fee: 'Shuttle fee', cost: '$200–$500', detail: 'If the big truck can\'t fit on your street, they transfer to a smaller truck. Common in tight neighborhoods.' },
  { fee: 'Bulky item surcharge', cost: '$50–$300/item', detail: 'Piano, pool table, gun safe, hot tub. Requires special equipment or extra crew.' },
  { fee: 'Weekend/peak surcharge', cost: '10–25% markup', detail: 'End-of-month and summer weekends are peak. Some companies add explicit surcharges.' },
  { fee: 'Fuel surcharge', cost: '$50–$200', detail: 'Some quote it separately, some roll it in. Ask for the all-in price.' },
  { fee: 'Storage-in-transit', cost: '$150–$300/month', detail: 'If your new place isn\'t ready yet. First 30 days sometimes included in long-distance quotes.' },
  { fee: 'Cancellation fee', cost: '$100–$500', detail: 'Cancel within 48 hours of your move date and most companies charge a fee.' },
];

const TIPPING_GUIDE = [
  { quality: 'Exceptional (fast, careful, friendly)', perMover: '$30–$50', percentOfBill: '20%+' },
  { quality: 'Good (professional, no issues)', perMover: '$20–$30', percentOfBill: '15–20%' },
  { quality: 'Average (got the job done)', perMover: '$10–$20', percentOfBill: '10–15%' },
  { quality: 'Below average (slow, careless)', perMover: '$0–$10', percentOfBill: '0–10%' },
];

export default function HowMuchDoMoversCostPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Do Movers Cost? Hourly Rates, Flat Rates & Hidden Fees',
    description: 'Complete guide to mover costs including hourly rates, flat rate pricing, hidden fees, and tipping.',
    datePublished: '2026-02-19',
    dateModified: '2026-02-19',
    author: { '@type': 'Organization', name: 'MoverCompare' },
    publisher: { '@type': 'Organization', name: 'MoverCompare', url: 'https://movercompare.com' },
    mainEntityOfPage: 'https://movercompare.com/blog/how-much-do-movers-cost',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much do movers charge per hour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Movers charge $25–$50 per mover per hour, which works out to $80–$120/hr for a 2-person crew with a truck. A 3-person crew runs $120–$170/hr and a 4-person crew costs $160–$220/hr. Most local moves take 3–6 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it better to hire movers by the hour or get a flat rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For short local moves (under 2 hours), hourly is usually cheaper. For anything longer or long-distance, flat rate is better because you know the price upfront and movers are incentivized to work efficiently. Always get both options quoted.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should you tip movers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard tip is $20–$30 per mover for good service, or 15–20% of the total bill split among the crew. For a 4-hour move with a 3-person crew, that is $60–$90 total. Tip in cash directly to each mover at the end of the job.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hidden fees do moving companies charge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common hidden fees include: stair fees ($50–$100/flight), long carry fees ($50–$150), elevator fees ($75–$150), shuttle fees ($200–$500), bulky item surcharges ($50–$300/item), weekend markups (10–25%), and fuel surcharges ($50–$200). Always ask for an all-in price.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do long distance movers cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Long distance movers charge based on weight and distance. A 2-bedroom move of 1,000 miles costs $3,500–$6,000 on average. Cross-country moves (2,500+ miles) run $4,000–$10,000+. Weight is typically $0.50–$0.80 per pound.',
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
            How Much Do Movers Cost? Hourly Rates, Flat Rates &amp; Hidden Fees
          </h1>
          <p className="text-white/60 mt-2 text-sm">February 19, 2026 · 11 min read</p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-3xl mx-auto mt-6 px-4" />

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-5 mb-8 not-prose">
          <p className="text-primary font-semibold mb-1">Quick answer:</p>
          <p className="text-gray-700 m-0">
            Movers charge <strong>$25–$50 per mover per hour</strong> for local moves, which works out to <strong>$80–$220/hr</strong> for a crew of 2–4. A typical 2-bedroom local move costs <strong>$600–$1,500</strong> total. Long distance is <strong>$2,500–$10,000+</strong> based on weight and distance.
          </p>
        </div>

        <p>
          Everyone asks &ldquo;how much do movers cost?&rdquo; and every moving company says &ldquo;it depends.&rdquo; Here&apos;s the thing — it does depend, but on predictable factors you can nail down before calling anyone.
        </p>

        <nav className="bg-gray-50 rounded-xl p-6 mb-10 not-prose">
          <h2 className="text-lg font-bold text-primary mb-3">In this guide:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li><a href="#hourly-rates" className="text-accent hover:text-accent-dark">Hourly rates by crew size</a></li>
            <li><a href="#flat-vs-hourly" className="text-accent hover:text-accent-dark">Flat rate vs hourly: which is better</a></li>
            <li><a href="#hidden-fees" className="text-accent hover:text-accent-dark">Hidden fees that inflate your bill</a></li>
            <li><a href="#tipping" className="text-accent hover:text-accent-dark">Tipping guide</a></li>
            <li><a href="#save-money" className="text-accent hover:text-accent-dark">How to lower your moving cost</a></li>
            <li><a href="#faq" className="text-accent hover:text-accent-dark">FAQ</a></li>
          </ol>
        </nav>

        {/* Hourly Rates */}
        <h2 id="hourly-rates">Mover Hourly Rates by Crew Size</h2>
        <p>
          Local moves are charged by the hour. The rate depends on crew size, which depends on how much stuff you have:
        </p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Crew</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Hourly Rate</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">4-Hour Move</th>
                <th className="text-left py-3 font-semibold text-primary">Best For</th>
              </tr>
            </thead>
            <tbody>
              {HOURLY_RATES.map((row) => (
                <tr key={row.crew} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.crew}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.hourlyRate}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.typical4hr}</td>
                  <td className="py-3 text-gray-600">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Most companies have a <strong>2–3 hour minimum</strong>. The clock starts when the crew arrives and stops when the last item is off the truck. Driving time between locations is billable.
        </p>

        <p>
          A common pricing trap: the per-person rate looks low ($25/hr per mover) but the total rate ($100+/hr for a crew) adds up fast. Always ask for the <strong>total hourly rate including the truck</strong>.
        </p>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* Flat vs Hourly */}
        <h2 id="flat-vs-hourly">Flat Rate vs Hourly: Which Should You Choose?</h2>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Factor</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Hourly</th>
                <th className="text-left py-3 font-semibold text-primary">Flat Rate</th>
              </tr>
            </thead>
            <tbody>
              {FLAT_VS_HOURLY.map((row) => (
                <tr key={row.factor} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.factor}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.hourly}</td>
                  <td className="py-3 text-gray-700">{row.flat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>Our recommendation:</strong> Get both quotes and compare. For anything over a 1-bedroom apartment, flat rate usually wins because you know exactly what you&apos;re paying and the movers are motivated to finish quickly.
        </p>

        <p>
          For a broader look at pricing by move type and home size, see our <Link href="/blog/moving-company-cost">moving company cost guide</Link>.
        </p>

        {/* Hidden Fees */}
        <h2 id="hidden-fees">Hidden Fees That Inflate Your Moving Bill</h2>
        <p>
          The quote is just the starting point. These extras show up on the final invoice and catch people off guard:
        </p>

        <div className="not-prose space-y-4 mb-8">
          {HIDDEN_FEES.map((item, i) => (
            <div key={i} className="bg-red-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-red-800 text-sm">{item.fee}</h3>
                <span className="text-red-700 font-medium text-sm ml-4 whitespace-nowrap">{item.cost}</span>
              </div>
              <p className="text-sm text-red-700 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>

        <p>
          <strong>How to protect yourself:</strong> Ask for a binding or not-to-exceed estimate. A &ldquo;binding&rdquo; estimate means the price can&apos;t go up. A &ldquo;not-to-exceed&rdquo; means it could go down but not up. Avoid &ldquo;non-binding&rdquo; estimates for long-distance moves — the final bill can be significantly higher.
        </p>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* Tipping Guide */}
        <h2 id="tipping">How Much to Tip Movers</h2>
        <p>
          Tipping movers isn&apos;t required but is customary and appreciated. These are real people doing backbreaking work with your stuff. Here&apos;s the standard:
        </p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Service Quality</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Per Mover</th>
                <th className="text-left py-3 font-semibold text-primary">% of Total Bill</th>
              </tr>
            </thead>
            <tbody>
              {TIPPING_GUIDE.map((row) => (
                <tr key={row.quality} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary">{row.quality}</td>
                  <td className="py-3 pr-3 font-semibold text-accent-dark">{row.perMover}</td>
                  <td className="py-3 text-gray-700">{row.percentOfBill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="not-prose bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700">
            <strong>Example:</strong> 3 movers, 5-hour move, $750 total bill, good service → $20–$30 per mover = $60–$90 total tip. Hand cash directly to each mover at the end — don&apos;t give it to the company or the foreman to distribute.
          </p>
        </div>

        <p>
          Beyond cash: water, snacks, and pizza go a long way. Movers remember customers who treat them well — and they take extra care with your stuff.
        </p>

        {/* Save Money */}
        <h2 id="save-money">6 Ways to Lower Your Moving Cost</h2>
        <ol>
          <li>
            <strong>Declutter before you move.</strong> Every pound costs money on long-distance moves. Every hour costs money on local moves. Less stuff = less cost. Period.
          </li>
          <li>
            <strong>Move mid-week, mid-month.</strong> Tuesday–Thursday moves can be 10–20% cheaper. First/last of the month is peak demand.
          </li>
          <li>
            <strong>Pack yourself.</strong> Full packing adds 30–80% to the base cost. Buy boxes from Home Depot or get free ones from liquor stores and grocery stores.
          </li>
          <li>
            <strong>Get 3–5 quotes.</strong> Prices vary 30–50% between companies for the same move. Use <Link href="/">MoverCompare</Link> to compare quickly.
          </li>
          <li>
            <strong>Disassemble furniture yourself.</strong> Movers charge for the time it takes to break down beds, desks, and shelving. Do it the night before.
          </li>
          <li>
            <strong>Be ready when the crew arrives.</strong> Boxes packed, paths cleared, parking secured. Every minute the crew spends waiting is money on the clock.
          </li>
        </ol>

        <p>
          Looking for the most affordable options? Check out our <Link href="/blog/cheap-movers-near-me">guide to finding cheap movers</Link>.
        </p>

        {/* FAQ */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <div className="space-y-6 not-prose mb-8">
          <div>
            <h3 className="font-semibold text-primary">How much do movers charge per hour?</h3>
            <p className="text-gray-700 mt-1">
              $25–$50 per mover per hour, or $80–$220/hr for a crew of 2–4 with a truck. Most local moves take 3–6 hours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Is it better to hire movers by the hour or get a flat rate?</h3>
            <p className="text-gray-700 mt-1">
              Hourly is better for short local moves (under 2 hours). Flat rate is better for anything longer or long-distance — you know the price upfront and movers work faster.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">How much should you tip movers?</h3>
            <p className="text-gray-700 mt-1">
              $20–$30 per mover for good service, or 15–20% of the total bill. Tip each mover directly in cash at the end of the move.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">What hidden fees do moving companies charge?</h3>
            <p className="text-gray-700 mt-1">
              Stair fees ($50–$100/flight), long carry fees ($50–$150), elevator fees, shuttle fees, bulky item surcharges, weekend markups, and fuel surcharges. Always ask for the all-in price.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">How much do long distance movers cost?</h3>
            <p className="text-gray-700 mt-1">
              Weight-based: $0.50–$0.80/lb. A 2-bedroom move of 1,000 miles averages $3,500–$6,000. Cross-country runs $4,000–$10,000+.
            </p>
          </div>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">Compare Mover Prices in Your Area</h2>
          <p className="text-gray-600 mb-4">
            Find trusted local movers and see real pricing.
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
