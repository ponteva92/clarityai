import type { CSSProperties } from 'react';

/* The real ClarityAI emblem (clean transparent matte) used as a CSS mask so it
   can be filled with the live brand gradient — crisp at any size, on-brand on dark. */
const EMBLEM = "url('/brand/clarity-emblem.png')";
const mask: CSSProperties = {
  WebkitMaskImage: EMBLEM,
  maskImage: EMBLEM,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

/**
 * Static brand emblem for the navbar / footer lockups. Decorative by itself —
 * pair it with the "ClarityAI" wordmark, which carries the accessible name.
 * Lifts on hover when placed inside a `group`.
 */
export function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-block shrink-0 ${className}`}>
      <span
        className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-110"
        style={{
          ...mask,
          backgroundImage: 'linear-gradient(135deg, #00f5ff 0%, #7df9ff 42%, #ffffff 56%, #a855f7 100%)',
          filter: 'drop-shadow(0 0 5px rgba(0,245,255,0.45))',
        }}
      />
    </span>
  );
}
