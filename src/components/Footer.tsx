import Link from 'next/link';
import { getCities } from '@/lib/data';
import { config } from '@/lib/config';

export default function Footer() {
  const cities = getCities();
  const initial = config.name[0];

  return (
    <footer className="bg-primary-dark text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-sm">
                {initial}
              </div>
              <span className="text-xl font-bold text-white">{config.name}</span>
            </div>
            <p className="text-sm leading-relaxed">{config.description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-sm">
              {cities.sort((a, b) => b.count - a.count).slice(0, 10).map((c) => (
                <li key={`${c.state_slug}-${c.city_slug}`}>
                  <Link href={`/${c.state_slug}/${c.city_slug}`} className="hover:text-accent transition-colors">
                    {c.city}, {c.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/#sizes" className="hover:text-accent transition-colors">Service Guide</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} {config.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
