import { ReactElement, ReactNode } from 'react';
import { Dialog as D } from '@base-ui-components/react/dialog';
import { X } from 'lucide-react';

interface DialogProps {
  /** The element that opens the dialog (Base UI merges trigger props onto it). */
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

/**
 * Accessible modal (Base UI) with a blurred backdrop and a spring-eased panel
 * (.bui-backdrop / .bui-dialog). Focus trap, scroll lock and Esc-to-close are
 * handled by Base UI.
 */
export function Dialog({ trigger, title, description, children }: DialogProps) {
  return (
    <D.Root>
      <D.Trigger render={trigger as ReactElement<Record<string, unknown>>} />
      <D.Portal>
        <D.Backdrop className="bui-backdrop fixed inset-0 z-[90]" />
        <D.Popup className="bui-dialog fixed left-1/2 top-1/2 z-[91] w-[min(92vw,40rem)] max-h-[88vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#0e1211] p-8 md:p-10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" aria-hidden />
          <D.Title className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight pr-10">
            {title}
          </D.Title>
          {description && <D.Description className="mt-2 text-brand-gray">{description}</D.Description>}
          <div className="mt-6 text-brand-gray leading-relaxed">{children}</div>
          <D.Close className="absolute top-5 right-5 w-9 h-9 inline-flex items-center justify-center rounded-full text-brand-gray hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60">
            <X className="w-5 h-5" />
          </D.Close>
        </D.Popup>
      </D.Portal>
    </D.Root>
  );
}
