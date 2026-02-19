'use client';

import { config } from '@/lib/config';

export default function ServiceFilter({
  selected,
  onChange,
}: {
  selected: number | null;
  onChange: (value: number | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {config.serviceOptions.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(selected === opt.value ? null : opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === opt.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {opt.label} {config.serviceOptions.unit}
        </button>
      ))}
    </div>
  );
}
