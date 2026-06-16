import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  /** Text rendered before the number (e.g. "€"). */
  prefix?: string;
  /** Text rendered after the number (e.g. "%", "+", " pv"). */
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo for a confident, premium settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(eased * value);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={['tabular-nums', className].filter(Boolean).join(' ')}>
      {prefix}
      {display.toLocaleString('fi-FI', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
