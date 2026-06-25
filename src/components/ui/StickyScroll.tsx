import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, useSpring } from 'framer-motion';

export interface StickyItem {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Visual rendered on the pinned side while this step is active. */
  visual: ReactNode;
}

interface StickyScrollProps {
  items: StickyItem[];
  /** Height multiplier per step (in viewport heights). */
  stepHeight?: number;
}

function StepBadge({ icon, index, active }: { icon?: ReactNode; index: number; active: boolean }) {
  return (
    <div
      className={`relative z-10 mt-0.5 w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-500 ${
        active
          ? 'bg-brand-cyan/15 border-brand-cyan text-brand-cyan shadow-[0_0_28px_rgba(16,185,129,0.4)] scale-110'
          : 'bg-white/5 border-white/10 text-brand-gray'
      }`}
    >
      {icon ?? <span className="font-mono text-sm">{index + 1}</span>}
    </div>
  );
}

/** Desktop-only pinned, scroll-driven storytelling. */
function PinnedSticky({ items, stepHeight }: { items: StickyItem[]; stepHeight: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(items.length - 1, Math.floor(latest * items.length));
    setActive(index < 0 ? 0 : index);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Subtle, springy counter-parallax so the pinned visual is never fully static.
  const visualYRaw = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const visualY = useSpring(visualYRaw, { stiffness: 80, damping: 24, mass: 0.5 });

  return (
    <div ref={ref} style={{ height: `${items.length * stepHeight * 100}vh` }} className="relative hidden lg:block">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Steps */}
            <div className="relative">
              {/* progress rail */}
              <div className="absolute left-[22px] top-4 bottom-4 w-px bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-amber shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                />
              </div>

              <div className="space-y-3">
                {items.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const top =
                          (ref.current?.offsetTop ?? 0) +
                          (i / items.length) * (ref.current?.offsetHeight ?? 0) +
                          1;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }}
                      className="relative flex items-start gap-5 text-left w-full rounded-2xl p-4 pr-6 transition-colors duration-500"
                    >
                      {/* Active glass highlight slides between steps */}
                      {isActive && (
                        <motion.span
                          layoutId="sticky-active"
                          aria-hidden
                          className="absolute inset-0 rounded-2xl glass-card border border-brand-cyan/25 shadow-[0_8px_40px_-12px_rgba(16,185,129,0.35)]"
                          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        />
                      )}
                      <StepBadge icon={item.icon} index={i} active={isActive} />
                      <div className="relative flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs transition-colors duration-500 ${isActive ? 'text-brand-cyan' : 'text-brand-gray/50'}`}>
                            0{i + 1}
                          </span>
                          <h3
                            className={`text-2xl font-display font-bold transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-brand-gray'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <motion.p
                          animate={{ opacity: isActive ? 1 : 0.55, height: 'auto' }}
                          className={`leading-relaxed mt-2 max-w-md ${isActive ? 'text-white/85' : 'text-brand-gray'}`}
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pinned visual */}
            <motion.div style={{ y: visualY }} className="relative h-[460px] perspective-1000">
              {/* ambient glow behind the active visual */}
              <div className="absolute -inset-8 bg-brand-cyan/10 blur-[80px] rounded-full pointer-events-none" />
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    scale: i === active ? 1 : 0.9,
                    rotateX: i === active ? 0 : 10,
                    y: i === active ? 0 : 24,
                    filter: i === active ? 'blur(0px)' : 'blur(10px)',
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                  style={{ pointerEvents: i === active ? 'auto' : 'none' }}
                >
                  {item.visual}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Scroll-driven storytelling. On large screens the right-hand visual pins and
 * cross-fades as you scroll through the steps; on small screens it gracefully
 * degrades to a clean stacked layout (no awkward over-long pinning).
 */
export function StickyScroll({ items, stepHeight = 0.46 }: StickyScrollProps) {
  return (
    <>
      <PinnedSticky items={items} stepHeight={stepHeight} />

      {/* Mobile / tablet: stacked */}
      <div className="lg:hidden container mx-auto px-6 space-y-16 py-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 glass-card border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center gap-4">
              <StepBadge icon={item.icon} index={i} active />
              <h3 className="text-2xl font-display font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-brand-gray leading-relaxed">{item.description}</p>
            <div className="h-[320px]">{item.visual}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
