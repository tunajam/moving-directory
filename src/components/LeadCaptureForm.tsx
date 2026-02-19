'use client';

import { useState } from 'react';
import { config } from '@/lib/config';

type Props = {
  cityName: string;
  stateName: string;
};

export default function LeadCaptureForm({ cityName, stateName }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { leadCapture } = config.monetization;
  if (!leadCapture.enabled) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, city: cityName, state: stateName }),
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-semibold text-green-800 text-lg">Request Submitted!</h3>
        <p className="text-green-700 text-sm mt-1">{leadCapture.successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-primary mb-1">{leadCapture.heading}</h3>
      <p className="text-sm text-gray-600 mb-4">{leadCapture.subheading}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <input
            name="phone"
            required
            type="tel"
            placeholder="Phone number"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <input
          name="email"
          required
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            name="service_needed"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
          >
            <option value="">Service needed</option>
            {config.serviceOptions.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} {config.serviceOptions.unit}
              </option>
            ))}
          </select>
          <input
            name="zip_code"
            required
            placeholder="Zip code"
            pattern="[0-9]{5}"
            maxLength={5}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-dark text-primary font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : leadCapture.buttonText}
        </button>
        <p className="text-xs text-gray-400 text-center">No spam. No obligation. Free quotes from local providers.</p>
      </form>
    </div>
  );
}
