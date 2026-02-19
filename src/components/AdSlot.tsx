import { config } from '@/lib/config';

type AdSlotProps = {
  position: 'top' | 'sidebar';
  className?: string;
};

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const { ads } = config.monetization;

  if (!ads.enabled) return null;
  if (position === 'top' && !ads.topSlot) return null;
  if (position === 'sidebar' && !ads.sidebarSlot) return null;

  const id = position === 'top' ? 'ad-slot-top' : 'ad-slot-sidebar';

  return (
    <div
      id={id}
      className={`border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 flex items-center justify-center ${
        position === 'top' ? 'w-full py-8 px-4' : 'w-full py-12 px-4'
      } ${className}`}
    >
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
          Advertisement
        </span>
        {/* Drop your AdSense/Mediavine code here */}
      </div>
    </div>
  );
}
