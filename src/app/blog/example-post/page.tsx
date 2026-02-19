import { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: `${config.industry.singular} Cost: What You'll Actually Pay | ${config.name}`,
  description: `A data-driven breakdown of ${config.industry.singular.toLowerCase()} costs across the US.`,
};

/**
 * Example blog post template.
 * Duplicate this file for each new post. Update the POSTS array in blog/page.tsx to match.
 */
export default function ExamplePost() {
  return (
    <>
      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-medium mb-2">
            <Link href="/blog" className="hover:underline">← Blog</Link>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {config.industry.singular} Cost: What You&apos;ll Actually Pay
          </h1>
          <p className="text-white/60 mt-2 text-sm">January 1, 2026 · 8 min read</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
        <p>
          This is an example blog post. Replace this content with your actual article.
          Blog posts are great for SEO — target long-tail keywords related to your industry.
        </p>

        <h2>What Affects Pricing?</h2>
        <p>Write about factors that affect pricing in your industry.</p>

        <h2>Average Costs by Region</h2>
        <p>Include data tables, comparisons, and real pricing information.</p>

        <h2>How to Save Money</h2>
        <p>Actionable tips that build trust with readers.</p>
      </article>

      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">Compare Prices in Your City</h2>
          <p className="text-gray-600 mb-4">
            Find the best {config.industry.singular.toLowerCase()} deals from local {config.industry.companyNounPlural}.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Compare Prices Now →
          </Link>
        </div>
      </section>
    </>
  );
}
