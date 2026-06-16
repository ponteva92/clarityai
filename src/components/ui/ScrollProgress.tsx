import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Slim gradient progress bar fixed to the very top of the viewport.
 * Reflects how far the user has scrolled through the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-amber shadow-[0_0_12px_rgba(0,245,255,0.6)]"
    />
  );
}
