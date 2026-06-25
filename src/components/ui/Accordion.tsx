import { ReactNode } from 'react';
import { Accordion as A } from '@base-ui-components/react/accordion';
import { Plus } from 'lucide-react';

export interface FaqItem {
  q: ReactNode;
  a: ReactNode;
}

/**
 * FAQ accordion (Base UI). Real measured-height animation via Base UI's
 * --accordion-panel-height (.bui-acc-panel), keyboard accessible, and the
 * "+" rotates to "x" using the trigger's data-panel-open state.
 */
export function FaqAccordion({ items, className = '' }: { items: FaqItem[]; className?: string }) {
  return (
    <A.Root className={`space-y-3 ${className}`}>
      {items.map((it, i) => (
        <A.Item
          key={i}
          className="glass-card gloss border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20"
        >
          <A.Header className="m-0">
            <A.Trigger className="group/acc flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer select-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60">
              <span className="text-lg font-semibold text-white">{it.q}</span>
              <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full border border-white/10 text-brand-cyan transition-transform duration-300 group-data-[panel-open]/acc:rotate-45">
                <Plus className="w-4 h-4" />
              </span>
            </A.Trigger>
          </A.Header>
          <A.Panel className="bui-acc-panel">
            <div className="px-6 pb-6 -mt-1 text-brand-gray leading-relaxed">{it.a}</div>
          </A.Panel>
        </A.Item>
      ))}
    </A.Root>
  );
}
