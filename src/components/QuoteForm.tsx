'use client';

import { useState } from 'react';
import { config } from '@/lib/config';

export default function QuoteForm({ companyName, companySlug }: { companyName: string; companySlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, company_slug: companySlug, company_name: companyName }),
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
        <h3 className="font-semibold text-green-800 text-lg">Quote Request Sent!</h3>
        <p className="text-green-700 text-sm mt-1">
          {config.quoteForm.successMessage.replace('{companyName}', companyName)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-primary/5 border border-primary/10 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-primary">{config.quoteForm.heading}</h3>
      <p className="text-sm text-gray-600">{config.quoteForm.subheading.replace('{companyName}', companyName)}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <select
        name="service_option"
        required
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
      >
        <option value="">Select {config.serviceOptions.label.toLowerCase()}</option>
        {config.serviceOptions.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} {config.serviceOptions.unit}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        rows={3}
        placeholder="Tell us about your project (optional)"
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent-dark text-primary font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending...' : config.quoteForm.submitButton}
      </button>
      <p className="text-xs text-gray-400 text-center">No spam. No obligation. Free quotes from local providers.</p>
    </form>
  );
}
