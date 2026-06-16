import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [12, 0]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span style={{ opacity, y, filter }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

/**
 * Cinematic statement type: each word fades, lifts and unblurs as the block
 * scrolls through the viewport — word-by-word, driven by scroll position.
 */
export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  });

  const words = text.split(' ');

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}
