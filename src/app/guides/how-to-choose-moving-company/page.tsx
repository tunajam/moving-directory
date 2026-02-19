import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { config } from '@/lib/config';
import AdSlot from '@/components/AdSlot';

const title = 'How to Choose a Moving Company (2026 Guide)';
const description = 'How to vet a moving company — DOT licensing, binding vs non-binding estimates, insurance options, red flags, and the questions to ask before you sign.';

export const metadata: Metadata = {
  title: `${title} | ${config.name}`,
  description,
  openGraph: { title, description, type: 'article' },
};

const faqData = [
  { q: 'How do I check if a moving company is legitimate?', a: 'For interstate moves, verify their USDOT number at FMCSA.gov. For local moves, check your state\'s licensing database. Also look for a physical address, consistent branding, and reviews across multiple platforms.' },
  { q: 'What\'s the difference between binding and non-binding estimates?', a: 'A binding estimate guarantees the price — you pay what was quoted regardless of actual weight. A non-binding estimate is the mover\'s best guess; the final price is based on actual weight and can be higher (up to 110% at delivery, remainder billed later).' },
  { q: 'What insurance do movers provide?', a: 'By law, interstate movers must offer Released Value Protection (free, covers $0.60/lb per item) and Full Value Protection (paid, mover must repair, replace, or pay cash value). For a 50-lb TV, released value pays just $30.' },
  { q: 'When should I book a moving company?', a: 'Book 4–8 weeks ahead for local moves, 8–12 weeks for interstate. Summer (June–August) is peak season — book earlier and expect prices 20–30% higher.' },
  { q: 'What are common moving scams?', a: 'Holding belongings hostage for inflated prices, large cash deposits, estimates given without seeing your stuff, no USDOT number, using a rental truck with no company branding.' },
];

export default function HowToChooseMovingCompany() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />

      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-medium mb-2">
            <Link href="/guides" className="hover:underline">← Guides</Link>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="text-white/60 mt-2 text-sm">February 2026 · 13 min read</p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-3xl mx-auto mt-6 px-4" />

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <p>
          Moving scams are shockingly common. Every year, thousands of people have their belongings held hostage, get hit with surprise charges, or hire a &quot;company&quot; that&apos;s just a guy with a rented truck. This guide will help you find a legitimate mover and avoid the ones that&apos;ll ruin your move.
        </p>

        <h2>1. Verify DOT Licensing (Interstate Moves)</h2>
        <p>
          Any company moving your stuff across state lines must be registered with the Federal Motor Carrier Safety Administration (FMCSA) and have a USDOT number. This is federal law, not optional.
        </p>
        <p>To verify:</p>
        <ol>
          <li>Ask the company for their USDOT number</li>
          <li>Search it at <strong>safer.fmcsa.dot.gov</strong></li>
          <li>Confirm: active authority, insurance on file, complaint history</li>
        </ol>
        <p>
          For <strong>local moves</strong> (within your state), requirements vary. Most states require a state-level license or registration. Check your state&apos;s public utility commission or transportation board.
        </p>

        <h2>2. Understand Estimate Types</h2>
        <div className="overflow-x-auto not-prose">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary/5">
                <th className="border border-gray-200 px-4 py-3 text-left font-bold">Type</th>
                <th className="border border-gray-200 px-4 py-3 text-left font-bold">How It Works</th>
                <th className="border border-gray-200 px-4 py-3 text-left font-bold">Risk to You</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 px-4 py-2 font-medium">Binding Estimate</td><td className="border border-gray-200 px-4 py-2">Guaranteed price based on inventory list</td><td className="border border-gray-200 px-4 py-2 text-green-700">Low — price is locked</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-4 py-2 font-medium">Binding Not-to-Exceed</td><td className="border border-gray-200 px-4 py-2">Guaranteed max; could be less if actual weight is lower</td><td className="border border-gray-200 px-4 py-2 text-green-700">Lowest — best option</td></tr>
              <tr><td className="border border-gray-200 px-4 py-2 font-medium">Non-Binding Estimate</td><td className="border border-gray-200 px-4 py-2">Best guess; final price based on actual weight</td><td className="border border-gray-200 px-4 py-2 text-red-700">Higher — can increase</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Always push for a binding not-to-exceed estimate.</strong> It protects you if the load is heavier than expected, and you pay less if it&apos;s lighter. Any company refusing to do an in-home or video survey before quoting is a red flag.
        </p>

        <h2>3. Know Your Insurance Options</h2>
        <p>Movers offer two levels of liability coverage:</p>
        <ul>
          <li>
            <strong>Released Value Protection (included free)</strong> — covers items at $0.60 per pound. Your $2,000 laptop weighing 5 lbs? They owe you $3. This is basically worthless.
          </li>
          <li>
            <strong>Full Value Protection (paid add-on)</strong> — the mover must repair, replace, or compensate at current market value. Typically adds $100–$400 to your move cost. <em>Worth every penny.</em>
          </li>
        </ul>
        <p>
          You can also buy separate moving insurance from a third party. This is smart for high-value moves — it covers what the mover&apos;s liability doesn&apos;t.
        </p>

        <h2>4. Red Flags That Scream &quot;Scam&quot;</h2>
        <ul>
          <li><strong>No USDOT number for an interstate move</strong> — illegal, period</li>
          <li><strong>Large cash deposit required</strong> — legitimate movers take credit cards and don&apos;t demand huge upfront payments</li>
          <li><strong>Quote given over the phone without seeing your stuff</strong> — how can they price what they haven&apos;t seen?</li>
          <li><strong>Blank or incomplete contract</strong> — if they ask you to sign something with blanks, walk away</li>
          <li><strong>No physical address</strong> — Google Maps should show a real office or warehouse, not a P.O. box</li>
          <li><strong>Price far below everyone else</strong> — lowball to win, then inflate on delivery day</li>
          <li><strong>Name changes</strong> — search for their company name + &quot;complaints.&quot; Scam operations rebrand frequently.</li>
          <li><strong>Unmarked trucks</strong> — legitimate companies have branded, DOT-labeled vehicles</li>
        </ul>

        <h2>5. Questions to Ask Every Mover</h2>
        <ol>
          <li>What is your USDOT number? (Verify it yourself)</li>
          <li>Do you offer binding not-to-exceed estimates?</li>
          <li>Will you do an in-home or video survey before quoting?</li>
          <li>What liability coverage options do you offer?</li>
          <li>Do you subcontract any part of the move to another company?</li>
          <li>What are your charges for stairs, long carries, or shuttle vehicles?</li>
          <li>What is your claims process if something is damaged?</li>
          <li>How do you handle delivery windows for long-distance moves?</li>
        </ol>

        <h2>6. Get Multiple Quotes (At Least Three)</h2>
        <p>
          Compare quotes side by side — not just total price, but what&apos;s included. One company&apos;s &quot;low&quot; quote might exclude packing materials, fuel surcharges, or insurance that another company builds in.
        </p>

        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, i) => (
          <div key={i}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </article>

      <AdSlot position="sidebar" className="max-w-3xl mx-auto px-4 mb-8" />

      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">Compare Moving Companies in Your City</h2>
          <p className="text-gray-600 mb-4">
            Find licensed, insured {config.industry.companyNounPlural} near you and compare quotes.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Compare Movers Now →
          </Link>
        </div>
      </section>
    </>
  );
}
