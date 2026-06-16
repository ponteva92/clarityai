import { ReactNode } from 'react';

interface MarqueeProps {
  items: ReactNode[];
  duration?: number;
  className?: string;
}

/**
 * Seamless, infinitely-scrolling marquee with edge fade masking.
 * Renders the item list twice so the loop is gapless.
 */
export function Marquee({ items, duration = 35, className = '' }: MarqueeProps) {
  return (
    <div className={`marquee-mask relative w-full overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-4"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
