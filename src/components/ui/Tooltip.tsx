import { ReactNode } from 'react';
import { Tooltip as T } from '@base-ui-components/react/tooltip';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

/**
 * Accessible tooltip (Base UI). Grows from the trigger via Base UI's
 * --transform-origin and data-[starting|ending]-style hooks (.bui-popup).
 * The trigger renders as an inline span so it can wrap text or icons.
 */
export function Tooltip({ content, children, side = 'top', delay = 180 }: TooltipProps) {
  return (
    <T.Provider delay={delay}>
      <T.Root>
        <T.Trigger render={<span className="inline-flex items-center cursor-default" />}>
          {children}
        </T.Trigger>
        <T.Portal>
          <T.Positioner side={side} sideOffset={8} className="z-[80]">
            <T.Popup className="bui-popup max-w-xs rounded-xl border border-white/10 bg-[#101413]/95 px-3 py-2 text-xs leading-relaxed text-brand-gray shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <T.Arrow className="text-[#101413]">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden>
                  <path d="M6 7L0 0H12L6 7Z" fill="currentColor" />
                </svg>
              </T.Arrow>
              {content}
            </T.Popup>
          </T.Positioner>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}
