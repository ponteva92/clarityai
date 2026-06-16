import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';

/* Geometry helper for the rotating interface rings (240×240 viewBox). */
const C = 120;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C - r * Math.sin(a) };
};

/* The real ClarityAI emblem (lifted from the brand mark to a clean transparent
   matte) used as a CSS mask so it can be filled with the live brand gradient. */
const EMBLEM = "url('/brand/clarity-emblem.png')";
const maskStyle: React.CSSProperties = {
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
 * Interactive ClarityAI logo: the real brand emblem, gradient-filled and glowing,
 * suspended inside two counter-rotating interface rings with orbiting satellites,
 * a breathing halo and a re-lit pulsing core. Tilts toward the cursor with spring
 * physics and a light that tracks the pointer. Reduced-motion safe.
 */
export function HeroLogo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 140, damping: 18, mass: 0.4 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 140, damping: 18, mass: 0.4 });
  const glowX = useTransform(px, [0, 1], ['25%', '75%']);
  const glowY = useTransform(py, [0, 1], ['25%', '75%']);
  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(0,245,255,0.45), rgba(168,85,247,0.18) 45%, transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="flex flex-col items-center gap-7">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative aspect-square w-[clamp(280px,38vw,460px)] [transform-style:preserve-3d]"
      >
        {/* Ambient breathing halo */}
        <div className="absolute inset-0 rounded-full bg-brand-cyan/20 blur-[90px] animate-halo-breathe pointer-events-none" />
        {/* Pointer-tracking light */}
        <motion.div
          aria-hidden
          className="absolute inset-[10%] rounded-full opacity-60 mix-blend-screen pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: cursorGlow }}
        />

        {/* Counter-rotating interface rings + orbiting satellites */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full overflow-visible"
          fill="none"
          style={reduce ? undefined : { transform: 'translateZ(24px)' }}
        >
          <defs>
            <linearGradient id="hl-grad" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#00f5ff" />
              <stop offset="0.55" stopColor="#a855f7" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Outer dashed ring */}
          <g className="animate-ring-slow" style={{ transformBox: 'view-box', transformOrigin: '120px 120px' }}>
            <circle cx="120" cy="120" r="116" stroke="url(#hl-grad)" strokeWidth="1" strokeDasharray="2 9" opacity="0.55" />
            {[0, 90, 180, 270].map((d) => {
              const p = polar(116, d);
              return <circle key={d} cx={p.x} cy={p.y} r="2.4" fill="#00f5ff" />;
            })}
          </g>

          {/* Mid ring with tick marks, counter-rotating */}
          <g className="animate-ring-rev" style={{ transformBox: 'view-box', transformOrigin: '120px 120px' }}>
            <circle cx="120" cy="120" r="103" stroke="url(#hl-grad)" strokeWidth="1.2" opacity="0.35" />
            {Array.from({ length: 36 }).map((_, i) => {
              const a = polar(103, i * 10);
              const b = polar(i % 3 === 0 ? 96 : 99, i * 10);
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#a855f7" strokeWidth="0.8" opacity="0.5" />;
            })}
          </g>

          {/* Orbiting satellites */}
          <g className="animate-ring-fast" style={{ transformBox: 'view-box', transformOrigin: '120px 120px' }}>
            <circle cx={polar(110, 20).x} cy={polar(110, 20).y} r="3" fill="#f59e0b" />
            <circle cx={polar(110, 200).x} cy={polar(110, 200).y} r="2.4" fill="#00f5ff" />
          </g>
        </svg>

        {/* The real ClarityAI emblem — filled with the live brand gradient and glowing */}
        <div
          aria-hidden
          className="absolute inset-[16%]"
          style={{
            ...maskStyle,
            backgroundImage:
              'linear-gradient(120deg, #00f5ff 0%, #7df9ff 28%, #ffffff 50%, #00f5ff 72%, #a855f7 100%)',
            backgroundSize: '220% auto',
            animation: reduce ? undefined : 'text-shimmer 7s linear infinite',
            filter: 'drop-shadow(0 0 16px rgba(0,245,255,0.45))',
            transform: reduce ? undefined : 'translateZ(40px)',
          }}
        />

        {/* Re-lit luminous core (the emblem's own bright core was keyed out) */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          fill="none"
          style={reduce ? undefined : { transform: 'translateZ(70px)' }}
        >
          <defs>
            <radialGradient id="hl-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.35" stopColor="#7df9ff" />
              <stop offset="0.75" stopColor="#00f5ff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#00f5ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="animate-core-pulse">
            <circle cx="120" cy="120" r="24" fill="url(#hl-core)" />
            <circle cx="120" cy="120" r="6" fill="#ffffff" />
            <circle cx="120" cy="120" r="10" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
          </g>
        </svg>
      </motion.div>

      {/* Brand wordmark lockup */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          Clarity<span className="text-gradient-animated">AI</span>
        </div>
        <div className="mt-1.5 text-[0.68rem] uppercase tracking-[0.4em] text-brand-gray/70">AI Made Clear</div>
      </motion.div>
    </div>
  );
}
