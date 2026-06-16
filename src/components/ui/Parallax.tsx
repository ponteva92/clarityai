import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  /** Vertical travel in px across the element's scroll through the viewport.
   *  Positive = moves down (slower), negative = moves up (faster). */
  offset?: number;
  className?: string;
}

/**
 * Wraps content and translates it at a different speed than the scroll,
 * creating layered 3D depth. Spring-smoothed for a fluid, premium feel.
 * Disabled when the user prefers reduced motion.
 */
export function Parallax({ children, offset = 80, className = '' }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const y = useSpring(raw, { stiffness: 90, damping: 30, mass: 0.4 });

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
