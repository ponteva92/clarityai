interface AuroraProps {
  className?: string;
}

/**
 * Soft, slowly-drifting aurora/mesh glow used as an ambient backdrop behind
 * hero and CTA sections. Purely decorative.
 */
export function Aurora({ className = '' }: AuroraProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -top-1/3 -left-1/4 w-[55vw] h-[55vw] rounded-full bg-brand-cyan/20 blur-[140px] animate-aurora" />
      <div
        className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-purple/20 blur-[140px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute -bottom-1/3 left-1/3 w-[45vw] h-[45vw] rounded-full bg-brand-amber/10 blur-[150px] animate-aurora"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  );
}
