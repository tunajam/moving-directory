import Link from 'next/link';
import { Company } from '@/lib/data';
import { config } from '@/lib/config';

export default function CompanyCard({ company }: { company: Company }) {
  const lowestPrice = company.services[0]?.price_range.split('–')[0] || 'N/A';
  const isVerified = company.verified === true;
  const isPricingEstimated = company.pricing_estimated !== false;

  return (
    <Link
      href={`/company/${company.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-accent/50 transition-all duration-200 group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-primary group-hover:text-accent-dark transition-colors">
            {company.name}
          </h3>
          {isVerified && (
            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
              ✓ Verified
            </span>
          )}
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full whitespace-nowrap ${
          isPricingEstimated
            ? 'text-gray-600 bg-gray-100'
            : 'text-accent-dark bg-accent/10'
        }`}>
          {isPricingEstimated ? '~' : ''}From {lowestPrice}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        📍 {company.city}, {company.state}
        {company.phone && <span className="ml-3">📞 {company.phone}</span>}
      </p>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{company.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {company.services.map((s) => (
          <span key={s.value} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {s.value} {config.serviceOptions.unit}
          </span>
        ))}
      </div>

      {isPricingEstimated && (
        <p className="text-xs text-gray-400 mt-3 italic">Pricing is estimated — contact for exact quotes</p>
      )}
    </Link>
  );
}
