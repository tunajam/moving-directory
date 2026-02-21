import Link from 'next/link';
import { config } from '@/lib/config';
import { Truck, List } from '@phosphor-icons/react/dist/ssr';

export default function Header() {
  return (
    <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Truck size={20} weight="bold" className="text-white" />
            </div>
            <span className="text-xl font-bold">{config.name}</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-accent-light transition-colors">Home</Link>
            <Link href="/#cities" className="hover:text-accent-light transition-colors">Browse Cities</Link>
            <Link href="/#how-it-works" className="hover:text-accent-light transition-colors">How It Works</Link>
            <Link href="/guides" className="hover:text-accent-light transition-colors">Guides</Link>
            <Link href="/blog" className="hover:text-accent-light transition-colors">Blog</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
