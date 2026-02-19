import { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Cheap Movers Near Me: Budget Options Compared (2026) | MoverCompare',
  description:
    'Find cheap movers near you. Compare DIY ($200–$800), portable containers ($1,500–$5,000), and budget full-service movers ($400–$2,000). Plus 10 money-saving tips.',
  keywords:
    'cheap movers near me, affordable movers, budget movers, cheap moving companies, low cost movers',
  alternates: {
    canonical: 'https://movercompare.com/blog/cheap-movers-near-me',
  },
  openGraph: {
    title: 'Cheap Movers Near Me: Budget Options Compared',
    description: 'Every budget moving option compared — DIY, pods, labor-only, and full-service. Find the cheapest way to move.',
    type: 'article',
    url: 'https://movercompare.com/blog/cheap-movers-near-me',
  },
};

const OPTIONS_COMPARED = [
  {
    option: 'DIY truck rental',
    cost: '$200–$800 (local), $1,000–$3,000 (long distance)',
    pros: 'Cheapest option, full control of timeline',
    cons: 'You do ALL the labor, risk of injury/damage, fuel costs extra',
    bestFor: 'Small moves, tight budgets, lots of willing friends',
  },
  {
    option: 'Portable containers (PODS, 1-800-PACK-RAT)',
    cost: '$1,500–$5,000',
    pros: 'Flexible timeline, you load at your pace, no driving',
    cons: 'Still requires loading/unloading labor, slow for long distance',
    bestFor: 'Long distance, no rush, willing to load yourself',
  },
  {
    option: 'Labor-only movers',
    cost: '$200–$600 (loading/unloading only)',
    pros: 'Cheapest professional option, you rent the truck',
    cons: 'You drive, limited liability, need to coordinate truck rental',
    bestFor: 'DIY movers who don\'t want to carry heavy stuff',
  },
  {
    option: 'Budget full-service movers',
    cost: '$400–$2,000 (local), $2,500–$6,000 (long distance)',
    pros: 'They handle everything, insured, experienced',
    cons: 'Most expensive option, less control over timing',
    bestFor: 'Anyone who values their time and back',
  },
  {
    option: 'Freight trailers (ABF U-Pack)',
    cost: '$1,000–$4,000',
    pros: 'Pay only for space used, cheaper than full-service for long distance',
    cons: 'You load, shared trailer, limited scheduling',
    bestFor: 'Long distance moves on a budget',
  },
];

const COST_COMPARISON = [
  { method: 'DIY truck (U-Haul)', studio: '$150–$300', twoBed: '$300–$600', threeBed: '$500–$800', longDist: '$800–$2,500' },
  { method: 'Labor-only + truck rental', studio: '$300–$500', twoBed: '$500–$900', threeBed: '$700–$1,200', longDist: '$1,200–$3,500' },
  { method: 'Portable container', studio: '$1,000–$1,500', twoBed: '$1,500–$2,500', threeBed: '$2,000–$3,500', longDist: '$2,500–$5,000' },
  { method: 'Freight trailer', studio: '$800–$1,200', twoBed: '$1,000–$2,000', threeBed: '$1,500–$3,000', longDist: '$1,500–$4,000' },
  { method: 'Budget full-service mover', studio: '$400–$700', twoBed: '$700–$1,500', threeBed: '$1,000–$2,200', longDist: '$2,500–$6,000' },
];

const SAVING_TIPS = [
  { tip: 'Declutter ruthlessly', savings: '10–30%', detail: 'Sell, donate, or trash anything you haven\'t used in a year. Less stuff = smaller truck = lower cost. Facebook Marketplace, Goodwill, and trash day are your friends.' },
  { tip: 'Move mid-week, mid-month', savings: '10–20%', detail: 'End-of-month weekends are peak demand. Tuesday–Thursday moves are cheapest. January and February are the cheapest months.' },
  { tip: 'Get free boxes', savings: '$50–$200', detail: 'Liquor stores, grocery stores, Craigslist "free" section, Nextdoor, and Buy Nothing groups. New boxes are a waste of money.' },
  { tip: 'Pack yourself', savings: '30–80% of packing cost', detail: 'Full packing costs $300–$2,000. Buy tape and newspaper and do it yourself over a weekend.' },
  { tip: 'Disassemble furniture in advance', savings: '1–2 hours of labor', detail: 'Break down beds, desks, bookshelves the night before. That\'s $80–$200 in hourly charges saved.' },
  { tip: 'Compare at least 4 quotes', savings: '20–40%', detail: 'Prices vary dramatically between companies. The lowest quote is often 30-40% less than the highest for the same move.' },
  { tip: 'Negotiate', savings: '5–15%', detail: 'Show competing quotes. Ask if there\'s a cash discount or mid-week rate. Moving is a competitive business — companies will deal.' },
  { tip: 'Use the right size truck', savings: '10–25%', detail: 'Renting a 26-footer for a 1-bedroom move wastes money. A 10-foot or 12-foot truck is cheaper and sufficient.' },
  { tip: 'Load efficiently', savings: 'Potentially a whole truck size', detail: 'Heavy items on bottom, fill gaps with small boxes, use every cubic inch. One fewer truck load = hundreds saved.' },
  { tip: 'Check employer benefits', savings: '$500–$5,000', detail: 'Many employers offer relocation assistance or moving stipends. Some credit cards have moving benefits. Ask HR before paying out of pocket.' },
];

export default function CheapMoversNearMePost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cheap Movers Near Me: Budget Options Compared',
    description: 'Compare budget moving options: DIY, pods, labor-only, and full-service.',
    datePublished: '2026-02-19',
    dateModified: '2026-02-19',
    author: { '@type': 'Organization', name: 'MoverCompare' },
    publisher: { '@type': 'Organization', name: 'MoverCompare', url: 'https://movercompare.com' },
    mainEntityOfPage: 'https://movercompare.com/blog/cheap-movers-near-me',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest way to move?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cheapest way to move is a DIY truck rental ($200–$800 for local moves). Rent a truck from U-Haul, Penske, or Budget, recruit friends, and do it yourself. For slightly more money with less physical work, hire labor-only movers ($200–$600) to load/unload while you drive the truck.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find cheap movers near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Get 4–5 quotes from local movers using MoverCompare, move mid-week/mid-month for lower rates, ask about cash discounts, pack yourself, and compare against DIY and portable container options. The cheapest legitimate full-service movers charge $80–$100/hr for a 2-person crew.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are cheap movers safe to hire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Budget movers can be fine if they are licensed, insured, and have positive reviews. Red flags: no USDOT number (required for interstate), cash-only, no written estimate, or a price that seems too good to be true. Verify on FMCSA.gov for interstate movers. Read reviews on Google, Yelp, and the BBB.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is PODS cheaper than hiring movers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For long-distance moves, PODS and portable containers ($1,500–$5,000) are often cheaper than full-service movers ($2,500–$10,000+). For local moves, full-service movers are usually cheaper and faster since you don\'t have to load/unload yourself. PODS make the most sense for flexible-timeline, long-distance moves.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a DIY move cost compared to hiring movers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A DIY truck rental costs $200–$800 for local moves and $800–$2,500 for long distance (plus gas, insurance, and your time). Full-service movers cost $400–$2,500 locally and $2,500–$10,000+ long distance. DIY saves 40–70% on cash cost but takes 2–3x longer and carries higher risk of injury or damage.',
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
            Cheap Movers Near Me: Budget Options Compared
          </h1>
          <p className="text-white/60 mt-2 text-sm">February 19, 2026 · 12 min read</p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-3xl mx-auto mt-6 px-4" />

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-5 mb-8 not-prose">
          <p className="text-primary font-semibold mb-1">The bottom line:</p>
          <p className="text-gray-700 m-0">
            The cheapest move is DIY (<strong>$200–$800</strong> local). But if you value your time and back, budget full-service movers run <strong>$400–$2,000</strong> for local moves. The sweet spot for most people is hiring <strong>labor-only movers + a truck rental</strong> at <strong>$500–$1,200</strong>.
          </p>
        </div>

        <p>
          &ldquo;Cheap movers&rdquo; can mean two very different things: legitimately affordable professionals or fly-by-night scammers who hold your stuff hostage. This guide covers the real budget options — what they cost, what the trade-offs are, and how to save money without getting burned.
        </p>

        <nav className="bg-gray-50 rounded-xl p-6 mb-10 not-prose">
          <h2 className="text-lg font-bold text-primary mb-3">In this guide:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li><a href="#options" className="text-accent hover:text-accent-dark">Budget moving options compared</a></li>
            <li><a href="#cost-table" className="text-accent hover:text-accent-dark">Side-by-side cost comparison</a></li>
            <li><a href="#saving-tips" className="text-accent hover:text-accent-dark">10 money-saving tips</a></li>
            <li><a href="#red-flags" className="text-accent hover:text-accent-dark">Avoiding moving scams</a></li>
            <li><a href="#faq" className="text-accent hover:text-accent-dark">FAQ</a></li>
          </ol>
        </nav>

        {/* Options Compared */}
        <h2 id="options">Budget Moving Options: Pros, Cons &amp; Costs</h2>
        <p>There are five main ways to move on a budget. Each has distinct trade-offs:</p>

        <div className="not-prose space-y-6 mb-8">
          {OPTIONS_COMPARED.map((opt, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-primary">{opt.option}</h3>
                <span className="text-accent-dark font-semibold text-sm ml-4 whitespace-nowrap">{opt.cost}</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-green-700 font-medium block mb-1">✅ Pros</span>
                  <p className="text-gray-600">{opt.pros}</p>
                </div>
                <div>
                  <span className="text-red-700 font-medium block mb-1">❌ Cons</span>
                  <p className="text-gray-600">{opt.cons}</p>
                </div>
                <div>
                  <span className="text-primary font-medium block mb-1">👤 Best for</span>
                  <p className="text-gray-600">{opt.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* Side-by-side cost */}
        <h2 id="cost-table">Side-by-Side Cost Comparison</h2>
        <p>Here&apos;s what each method costs by home size:</p>

        <div className="overflow-x-auto not-prose mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-3 font-semibold text-primary">Method</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">Studio/1BR</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">2BR</th>
                <th className="text-left py-3 pr-3 font-semibold text-primary">3BR</th>
                <th className="text-left py-3 font-semibold text-primary">Long Distance</th>
              </tr>
            </thead>
            <tbody>
              {COST_COMPARISON.map((row) => (
                <tr key={row.method} className="border-b border-gray-200">
                  <td className="py-3 pr-3 font-medium text-primary text-xs">{row.method}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.studio}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.twoBed}</td>
                  <td className="py-3 pr-3 text-gray-700">{row.threeBed}</td>
                  <td className="py-3 text-gray-700">{row.longDist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>The hidden cost of DIY:</strong> A truck rental for $300 sounds great until you factor in gas ($50–$150), insurance ($30–$60), dollies and blankets ($30–$50), pizza and beer for helpers ($40–$80), and 8–12 hours of backbreaking labor. The &ldquo;savings&rdquo; shrink fast.
        </p>

        <p>
          For detailed pricing on full-service options, check our <Link href="/blog/moving-company-cost">moving company cost guide</Link> and <Link href="/blog/how-much-do-movers-cost">hourly rate breakdown</Link>.
        </p>

        {/* Money-Saving Tips */}
        <h2 id="saving-tips">10 Money-Saving Tips for Any Move</h2>

        <div className="not-prose space-y-4 mb-8">
          {SAVING_TIPS.map((item, i) => (
            <div key={i} className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-green-800 text-sm">{i + 1}. {item.tip}</h3>
                <span className="text-green-700 font-medium text-xs ml-4 whitespace-nowrap">Saves {item.savings}</span>
              </div>
              <p className="text-sm text-green-700 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>

        <AdSlot position="sidebar" className="my-8 not-prose" />

        {/* Red Flags */}
        <h2 id="red-flags">Avoiding Moving Scams</h2>
        <p>
          The moving industry has a real scam problem. Here&apos;s how to protect yourself while hunting for budget options:
        </p>

        <ul>
          <li>
            <strong>Verify the USDOT number.</strong> Interstate movers must be registered with FMCSA. Look them up at <a href="https://safer.fmcsa.dot.gov" target="_blank" rel="noopener noreferrer">safer.fmcsa.dot.gov</a>.
          </li>
          <li>
            <strong>Never pay a large deposit.</strong> Legitimate movers rarely require more than a small booking deposit ($100–$200). If they want 50% upfront, run.
          </li>
          <li>
            <strong>Get a written, binding estimate.</strong> Especially for long-distance moves. A phone estimate without a visual survey is a red flag.
          </li>
          <li>
            <strong>Check reviews — but verify them.</strong> A company with 50 perfect 5-star reviews and no details is suspicious. Look for specific, varied reviews mentioning real experiences.
          </li>
          <li>
            <strong>Watch for the &ldquo;hostage&rdquo; scam.</strong> The company quotes low, loads your stuff, then demands 2–3x the price before unloading. A binding estimate prevents this.
          </li>
          <li>
            <strong>Avoid Craigslist movers.</strong> Some are legitimate, many aren&apos;t. If you go this route, verify insurance, get everything in writing, and don&apos;t let them load until you have a signed contract.
          </li>
        </ul>

        <p>
          The cheapest mover is almost never the best choice. The best budget choice is a <strong>legitimately affordable, licensed, insured mover</strong> — and there are plenty of them. Use <Link href="/">MoverCompare</Link> to find ones in your area.
        </p>

        {/* FAQ */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <div className="space-y-6 not-prose mb-8">
          <div>
            <h3 className="font-semibold text-primary">What is the cheapest way to move?</h3>
            <p className="text-gray-700 mt-1">
              DIY truck rental ($200–$800 local). For less labor, hire labor-only movers ($200–$600) to load/unload while you drive the rental truck.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">How do I find cheap movers near me?</h3>
            <p className="text-gray-700 mt-1">
              Get 4–5 quotes using MoverCompare, move mid-week/mid-month, pack yourself, and ask about cash discounts. Cheapest legit full-service movers charge $80–$100/hr for 2 movers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Are cheap movers safe to hire?</h3>
            <p className="text-gray-700 mt-1">
              Budget movers can be fine if they&apos;re licensed, insured, and reviewed. Verify USDOT numbers for interstate, check Google/BBB reviews, get a written binding estimate, and never pay large deposits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Is PODS cheaper than hiring movers?</h3>
            <p className="text-gray-700 mt-1">
              For long distance, usually yes ($1,500–$5,000 vs $2,500–$10,000+). For local, movers are often cheaper and faster since you don&apos;t have to load/unload yourself.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">How much does a DIY move cost vs hiring movers?</h3>
            <p className="text-gray-700 mt-1">
              DIY saves 40–70% on cash cost ($200–$800 local vs $400–$2,500 with movers) but takes 2–3x longer and risks injury or damage to your belongings.
            </p>
          </div>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">Find Affordable Movers in Your Area</h2>
          <p className="text-gray-600 mb-4">
            Compare prices from local moving companies — free, no obligation.
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
