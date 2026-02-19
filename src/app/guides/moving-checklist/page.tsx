import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { config } from '@/lib/config';
import AdSlot from '@/components/AdSlot';

const title = 'Complete Moving Checklist: 8 Weeks to Moving Day';
const description = 'Week-by-week moving checklist covering everything from booking movers to unpacking — packing tips, utility transfers, address changes, and more.';

export const metadata: Metadata = {
  title: `${title} | ${config.name}`,
  description,
  openGraph: { title, description, type: 'article' },
};

const faqData = [
  { q: 'How far in advance should I start planning a move?', a: '8 weeks is ideal for local moves. For interstate or long-distance moves, start 10–12 weeks out — especially during summer peak season (June–August).' },
  { q: 'What should I pack first when moving?', a: 'Start with items you rarely use: seasonal decorations, guest room items, books, stored items. Leave daily essentials (kitchen basics, toiletries, work items) for the last few days.' },
  { q: 'How do I transfer utilities when moving?', a: 'Contact each provider 2–3 weeks before your move. Schedule disconnection at the old address for the day after moving day, and connection at the new address for the day before. Keep a list of every account.' },
  { q: 'What goes in a moving day essentials box?', a: 'Phone chargers, medications, toiletries, change of clothes, important documents, snacks, water bottles, basic tools (screwdriver, box cutter), toilet paper, paper towels, and trash bags.' },
  { q: 'How many boxes do I need for moving?', a: 'Rough estimate: 10 boxes per room for a small apartment, 15–20 per room for a house. A 3-bedroom home typically needs 60–100 boxes.' },
];

export default function MovingChecklist() {
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
          <p className="text-white/60 mt-2 text-sm">February 2026 · 15 min read</p>
        </div>
      </section>

      <AdSlot position="top" className="max-w-3xl mx-auto mt-6 px-4" />

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <p>
          Moving is stressful because there are a hundred things to do and no clear order. This checklist breaks it down week by week so nothing falls through the cracks.
        </p>

        <h2>8 Weeks Before Moving Day</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Research and get quotes from at least 3 <Link href="/guides/how-to-choose-moving-company" className="text-accent hover:underline font-medium">moving companies</Link></li>
            <li>Create a moving binder or folder (digital or physical) for all documents</li>
            <li>Set a moving budget — include movers, supplies, deposits, travel</li>
            <li>Start decluttering: room by room, decide what to keep, sell, donate, or trash</li>
            <li>If renting: give notice to your landlord (check lease for required timeline)</li>
            <li>Research your new area: schools, doctors, parking, storage if needed</li>
          </ul>
        </div>

        <h2>6 Weeks Before</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Book your moving company — confirm date, get binding estimate in writing</li>
            <li>Start collecting packing supplies: boxes, tape, bubble wrap, markers</li>
            <li>Begin packing rarely-used items: seasonal clothes, decor, books, storage closets</li>
            <li>Arrange school transfers for kids (request records)</li>
            <li>Get copies of medical/dental records, prescriptions</li>
            <li>Start using up pantry items — less food to move</li>
          </ul>
        </div>

        <h2>4 Weeks Before</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>File a change of address with USPS (usps.com — takes effect in ~7 days)</li>
            <li>Update address with: banks, credit cards, insurance, subscriptions, employer</li>
            <li>Contact utility companies: schedule disconnection at old address, connection at new</li>
            <li>Pack room by room — label every box with contents AND destination room</li>
            <li>Photograph electronics setups before disconnecting (saves hours reconnecting)</li>
            <li>Arrange pet/child care for moving day</li>
            <li>If moving out of state: research new driver&apos;s license and vehicle registration requirements</li>
          </ul>
        </div>

        <h2>2 Weeks Before</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Confirm moving company details: date, time, address, contact info, estimate</li>
            <li>Finish packing non-essential rooms</li>
            <li>Arrange cleaning for your old place (if required by lease)</li>
            <li>Dispose of items movers won&apos;t take: hazardous materials, propane, paint</li>
            <li>Defrost freezer if moving your fridge</li>
            <li>Back up all computer files</li>
            <li>Return library books, borrowed items, cancel local memberships</li>
          </ul>
        </div>

        <h2>1 Week Before</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Pack your essentials box (see below)</li>
            <li>Finish packing everything except daily-use items</li>
            <li>Disassemble furniture that needs it — bag hardware and tape to the piece</li>
            <li>Confirm utility shutoff/startup dates</li>
            <li>Prepare cash tip for movers (typically $20–$50 per mover for a full-day move)</li>
            <li>Plan meals for the last few days — paper plates and takeout</li>
            <li>Do a final walkthrough of your new place if possible</li>
          </ul>
        </div>

        <h2>Moving Day</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Do a final walkthrough of every room, closet, cabinet, and drawer</li>
            <li>Be present when movers arrive — walk through the inventory list with them</li>
            <li>Check and note any existing damage at the new place before unloading</li>
            <li>Direct movers on where to place boxes and furniture (room labels help)</li>
            <li>Check items off the inventory as they&apos;re unloaded</li>
            <li>Take meter readings at both addresses</li>
            <li>Lock up and leave keys/garage openers for old residence</li>
          </ul>
        </div>

        <h2>First Week After</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <ul className="space-y-2 list-disc pl-5">
            <li>Unpack essentials box first, then kitchen, then bedrooms</li>
            <li>Check that all utilities are working</li>
            <li>Update your driver&apos;s license and vehicle registration (most states give 30–90 days)</li>
            <li>Register to vote at your new address</li>
            <li>Find new doctors, dentist, vet</li>
            <li>File any damage claims with your mover (document with photos immediately)</li>
            <li>Change locks on new home or rekey (you don&apos;t know who has copies)</li>
          </ul>
        </div>

        <h2>Packing Tips That Actually Help</h2>
        <ul>
          <li><strong>Color-code by room.</strong> Colored tape or stickers on boxes — one color per room. Movers can place boxes without reading labels.</li>
          <li><strong>Pack heavy items in small boxes.</strong> Books in small boxes, linens in large boxes. Your back and your movers will thank you.</li>
          <li><strong>Use clothes as padding.</strong> Wrap fragile items in t-shirts and towels instead of buying extra bubble wrap.</li>
          <li><strong>Number your boxes.</strong> Write a master list: &quot;Box 1: Kitchen — pots, utensils.&quot; If a box goes missing, you know exactly what was in it.</li>
          <li><strong>Take photos of everything valuable.</strong> Document condition before the move for insurance claims.</li>
          <li><strong>Don&apos;t pack an &quot;everything else&quot; box.</strong> The last box you pack in a rush is the first one you&apos;ll need to dig through.</li>
        </ul>

        <h2>Utility Transfer Checklist</h2>
        <div className="not-prose bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm">
          <p className="font-bold mb-3">Transfer or cancel at old address / set up at new:</p>
          <ul className="space-y-1 list-disc pl-5">
            <li>Electricity</li>
            <li>Gas / heating</li>
            <li>Water / sewer</li>
            <li>Internet / cable</li>
            <li>Trash / recycling pickup</li>
            <li>Home security system</li>
            <li>Homeowner&apos;s / renter&apos;s insurance (update address)</li>
            <li>HOA (if applicable)</li>
          </ul>
        </div>

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
          <h2 className="text-xl font-bold text-primary mb-2">Find Moving Companies in Your City</h2>
          <p className="text-gray-600 mb-4">
            Compare licensed {config.industry.companyNounPlural} near you and get free quotes.
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
