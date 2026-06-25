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
      <div className="absolute -top-1/3 -left-1/4 w-[55vw] h-[55vw] rounded-full bg-brand-cyan/12 blur-[150px] animate-aurora" />
      <div
        className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-cyan/8 blur-[160px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  );
}
