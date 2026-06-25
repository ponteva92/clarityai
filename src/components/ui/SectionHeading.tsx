import { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  /** Heading level — use 'h1' for the single top-of-page title (SEO). */
  as?: 'h1' | 'h2';
  className?: string;
}

/**
 * Consistent, animated section header with a small "eyebrow" tag label
 * for a structured, editorial, premium rhythm across the site. Renders an
 * <h1> for page titles and <h2> for in-page sections to keep a strict,
 * SEO-friendly heading hierarchy.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as = 'h2',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  const Tag = as;
  const titleSize =
    as === 'h1'
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
      : 'text-3xl md:text-5xl';

  return (
    <div className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal direction="up">
          <span className="mb-4 inline-flex items-center gap-2.5 text-[0.7rem] font-mono uppercase tracking-[0.28em] text-brand-cyan">
            <span aria-hidden className="h-px w-6 bg-brand-cyan/40" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.05}>
        <Tag className={`${titleSize} font-display font-bold tracking-tight leading-[1.05]`}>
          {title}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.1}>
          <p className="text-brand-gray text-lg md:text-xl mt-6 leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
