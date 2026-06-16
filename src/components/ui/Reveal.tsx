import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  blur?: boolean;
}

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
};

/**
 * Scroll-reveal wrapper with an optional blur-in for a premium, cinematic feel.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  className,
  once = true,
  blur = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset[direction],
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
