import { useEffect, useState } from 'react';

interface SpotlightProps {
  /** Radius of the glow in pixels. */
  size?: number;
  color?: string;
}

/**
 * Fixed, full-viewport radial glow that follows the cursor — a subtle premium
 * ambience layer. Pointer-events are disabled so it never blocks interaction.
 */
export function Spotlight({ size = 600, color = 'rgba(16,185,129,0.05)' }: SpotlightProps) {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 40%)`,
      }}
    />
  );
}
