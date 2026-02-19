import Link from 'next/link';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: `${config.industry.singular} Guides | ${config.name}`,
  description: `Helpful guides for ${config.industry.singular.toLowerCase()} — sizing, costs, tips, and more.`,
};

/**
 * Guides index. Add guide entries here as you create them.
 */
const GUIDES = [
  {
    slug: 'getting-started',
    title: `Getting Started with ${config.industry.singular}`,
    excerpt: 'Everything you need to know before hiring a provider.',
  },
];

export default function GuidesIndex() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{config.industry.singular} Guides</h1>
          <p className="text-lg text-white/80">
            Everything you need to know about {config.industry.singular.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-accent/50 transition-all"
            >
              <h2 className="text-lg font-bold text-primary mb-2">{guide.title}</h2>
              <p className="text-gray-600 text-sm">{guide.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
