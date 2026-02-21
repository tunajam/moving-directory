import Link from 'next/link';
import { Company } from '@/lib/data';
import { config } from '@/lib/config';
import { MapPin, Phone, Star, SealCheck, Shield, Certificate, Truck, Package, Buildings, Warehouse } from '@phosphor-icons/react/dist/ssr';

const SERVICE_TYPE_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  local: { icon: <Truck size={12} weight="bold" />, label: 'Local' },
  'long-distance': { icon: <Truck size={12} weight="bold" />, label: 'Long-Distance' },
  commercial: { icon: <Buildings size={12} weight="bold" />, label: 'Commercial' },
  residential: { icon: <Package size={12} weight="bold" />, label: 'Residential' },
  packing: { icon: <Package size={12} weight="bold" />, label: 'Packing' },
  storage: { icon: <Warehouse size={12} weight="bold" />, label: 'Storage' },
};

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
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
            {company.name}
          </h3>
          {isVerified && (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
              <SealCheck size={12} weight="fill" /> Verified
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

      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} weight="fill" className="text-gray-400" />
          {company.city}, {company.state}
        </span>
        {company.phone && (
          <span className="inline-flex items-center gap-1">
            <Phone size={14} weight="fill" className="text-gray-400" />
            {company.phone}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star size={14} weight="fill" className="text-yellow-400" />
          {company.rating} ({company.review_count})
        </span>
      </div>

      {/* License & Insurance Badges */}
      <div className="flex items-center gap-2 mt-3">
        {company.licensed && (
          <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            <Certificate size={12} weight="bold" /> Licensed
          </span>
        )}
        {company.insured && (
          <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            <Shield size={12} weight="bold" /> Insured
          </span>
        )}
        {company.years_in_business > 0 && (
          <span className="text-xs text-gray-500">
            {company.years_in_business}+ yrs
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{company.description}</p>

      {/* Service Types */}
      <div className="flex flex-wrap gap-2 mt-4">
        {company.service_types?.map((type) => {
          const info = SERVICE_TYPE_ICONS[type];
          if (!info) return null;
          return (
            <span key={type} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent-dark px-2 py-1 rounded-full">
              {info.icon} {info.label}
            </span>
          );
        })}
      </div>

      {isPricingEstimated && (
        <p className="text-xs text-gray-400 mt-3 italic">Pricing is estimated — contact for exact quotes</p>
      )}
    </Link>
  );
}
