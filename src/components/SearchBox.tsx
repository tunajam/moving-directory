'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { config, t } from '@/lib/config';
import citiesIndex from '@/lib/cities-index.json';

interface CityEntry {
  city: string;
  city_slug: string;
  state: string;
  state_slug: string;
}

const cities: CityEntry[] = citiesIndex as CityEntry[];

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityEntry[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setSelectedIndex(-1);
    const q = value.trim().toLowerCase();
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matches = cities.filter((c) => {
      const label = `${c.city}, ${c.state}`.toLowerCase();
      return label.includes(q) || c.city.toLowerCase().startsWith(q);
    }).slice(0, 8);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }

  function navigateToCity(city: CityEntry) {
    setShowSuggestions(false);
    setQuery(`${city.city}, ${city.state}`);
    router.push(`/${city.state_slug}/${city.city_slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      navigateToCity(suggestions[selectedIndex]);
      return;
    }
    if (suggestions.length > 0) {
      navigateToCity(suggestions[0]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={config.hero.searchPlaceholder}
          className="flex-1 px-5 py-3.5 rounded-l-xl border-2 border-r-0 border-white/30 bg-white/10 text-white placeholder-white/60 text-sm focus:outline-none focus:border-accent backdrop-blur-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-r-xl transition-colors text-sm whitespace-nowrap"
        >
          {t(config.hero.searchButton, { industryPlural: config.industry.plural })}
        </button>
      </form>
      {showSuggestions && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {suggestions.map((city, i) => (
            <li
              key={`${city.state_slug}-${city.city_slug}`}
              className={`px-5 py-3 text-sm cursor-pointer transition-colors ${
                i === selectedIndex ? 'bg-accent/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onMouseDown={() => navigateToCity(city)}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="font-medium">{city.city}</span>
              <span className="text-gray-400">, {city.state}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
