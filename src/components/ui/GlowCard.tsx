import { ReactNode, useRef } from 'react';

interface GlowGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a set of GlowCards and drives a single, unified light source from the
 * cursor across all of them (Linear/Vercel-style). One rAF-throttled listener
 * writes each card's local cursor coordinates into CSS variables.
 */
export function GlowGrid({ children, className = '' }: GlowGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>('[data-glow]');
      cards?.forEach((card) => {
        const r = card.getBoundingClientRect();
        const mx = clientX - r.left;
        const my = clientY - r.top;
        const near = mx >= -120 && mx <= r.width + 120 && my >= -120 && my <= r.height + 120;
        card.style.setProperty('--mx', `${mx}px`);
        card.style.setProperty('--my', `${my}px`);
        card.style.setProperty('--glow', near ? '1' : '0');
      });
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(raf.current);
    ref.current?.querySelectorAll<HTMLElement>('[data-glow]').forEach((c) => c.style.setProperty('--glow', '0'));
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * A glass card with a cursor-tracking 1px gradient border and soft surface
 * glow. Must live inside a <GlowGrid> to receive cursor coordinates.
 */
export function GlowCard({ children, className = '' }: GlowCardProps) {
  return (
    <div data-glow className={`glass-card gloss relative overflow-hidden ${className}`}>
      <div className="glow-card__border" aria-hidden />
      <div className="glow-card__surface" aria-hidden />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
