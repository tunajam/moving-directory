import Link from 'next/link';
import { Metadata } from 'next';
import { config, t } from '@/lib/config';

export const metadata: Metadata = {
  title: t(config.blog.title, { industry: config.industry.singular }) + ` | ${config.name}`,
  description: t(config.blog.description, { industry: config.industry.singular }),
};

/**
 * Blog post registry.
 * Add entries here when you create new blog posts in blog/[slug]/page.tsx.
 */
const POSTS = [
  {
    slug: 'example-post',
    title: `${config.industry.singular} Cost: What You'll Actually Pay`,
    excerpt: 'A deep dive into pricing across different markets.',
    date: 'January 1, 2026',
    readTime: '8 min read',
    category: 'Pricing',
  },
];

export default function BlogIndex() {
  const blogTitle = t(config.blog.title, { industry: config.industry.singular });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: blogTitle,
    url: `https://${config.domain}/blog`,
    description: t(config.blog.description, { industry: config.industry.singular }),
    publisher: {
      '@type': 'Organization',
      name: config.name,
      url: `https://${config.domain}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{blogTitle}</h1>
          <p className="text-lg text-white/80">
            {t(config.blog.description, { industry: config.industry.singular })}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <span className="bg-accent/10 text-accent-dark px-2 py-0.5 rounded font-medium text-xs">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl font-bold text-primary mb-2">Looking for Prices in Your City?</h2>
          <p className="text-gray-600 mb-4">
            Compare {config.industry.singular.toLowerCase()} prices from local {config.industry.companyNounPlural}.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Compare Prices Now
          </Link>
        </div>
      </section>
    </>
  );
}
