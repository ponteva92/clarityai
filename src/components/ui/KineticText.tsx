import type { CSSProperties } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface KineticTextProps {
  /** A single phrase, repeated and looped across the band. */
  text: string;
  /** Marquee duration in seconds (lower = faster). */
  duration?: number;
}

/**
 * Signature kinetic type band: one oversized, razor-sharp row that flows
 * continuously (GPU-composited CSS marquee), carries a live shimmering
 * cyan→purple gradient, and skews with scroll velocity via spring physics so it
 * feels reactive and expensive. Single confident row — no ghost shadow.
 */
export function KineticText({ text, duration = 30 }: KineticTextProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 350 });
  const skewRaw = useTransform(smoothVelocity, [-1600, 0, 1600], [-6, 0, 6], { clamp: true });
  const skewSpring = useSpring(skewRaw, { damping: 28, stiffness: 180, mass: 0.4 });
  const skewZero = useTransform(skewSpring, () => 0);
  const skew = reduce ? skewZero : skewSpring;

  const sizeCls =
    'text-[15vw] sm:text-[11vw] lg:text-[8.6vw] font-display font-extrabold uppercase tracking-[-0.05em] leading-[0.9]';

  return (
    <div className="relative [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div className="overflow-hidden flex select-none" aria-hidden>
        <motion.div style={{ skewX: skew }} className="flex flex-nowrap will-change-transform">
          <div
            className="flex flex-nowrap animate-kinetic"
            style={{ '--kinetic-duration': `${duration}s` } as CSSProperties}
          >
            <span className={`${sizeCls} text-gradient-animated shrink-0 pr-[0.3em]`}>{text.repeat(4)}</span>
            <span className={`${sizeCls} text-gradient-animated shrink-0 pr-[0.3em]`}>{text.repeat(4)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
