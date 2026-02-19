'use client';

import { useState } from 'react';
import { config } from '@/lib/config';

type Props = {
  companyName: string;
  companySlug: string;
};

export default function ClaimListingForm({ companyName, companySlug }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { claimListing } = config.monetization;
  if (!claimListing.enabled) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await fetch('/api/claim-listing', {
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
      <div className="border-2 border-dashed border-green-300 rounded-xl p-6 bg-green-50 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-semibold text-green-800 text-lg">Claim Request Submitted!</h3>
        <p className="text-green-700 text-sm mt-1">
          We&apos;ll review your request and get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-accent/40 rounded-xl p-6 bg-accent/5">
      <div className="text-center">
        <h3 className="font-semibold text-primary text-lg mb-2">{claimListing.heading}</h3>
        <p className="text-sm text-gray-600 mb-4">{claimListing.subheading}</p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="inline-block px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            {claimListing.buttonText}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left mt-4">
            <input
              name="owner_name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              name="phone"
              required
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              name="company"
              required
              placeholder="Your company name"
              defaultValue={companyName}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-dark text-primary font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Claim Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
