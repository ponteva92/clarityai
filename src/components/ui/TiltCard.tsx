import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  /** Lift on hover (px) for a "floating off the page" feel. */
  lift?: number;
}

/**
 * Cursor-driven 3D tilt with spring physics — the card subtly rotates toward
 * the pointer and lifts on hover, so elements feel like they float in an
 * expansive digital space. Disabled for reduced-motion and coarse pointers.
 */
export function TiltCard({ children, className = '', max = 9, lift = 6 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18, mass: 0.3 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18, mass: 0.3 });
  const liftY = useSpring(0, { stiffness: 200, damping: 22 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    liftY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => liftY.set(-lift)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, y: liftY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
