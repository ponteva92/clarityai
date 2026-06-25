import { Select as S } from '@base-ui-components/react/select';
import { Check, ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * Styled, accessible select (Base UI) replacing the native control. Animated
 * popup (.bui-popup), keyboard typeahead, and emerald highlight/selected
 * states via .bui-item.
 */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Valitse',
  ariaLabel,
  className = '',
}: SelectProps) {
  return (
    <S.Root value={value} onValueChange={onValueChange} items={options}>
      <S.Trigger
        aria-label={ariaLabel}
        className={`flex w-full items-center justify-between gap-3 rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-left text-white transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 data-[popup-open]:border-brand-cyan/50 ${className}`}
      >
        <S.Value>
          {(val: string) => options.find((o) => o.value === val)?.label ?? placeholder}
        </S.Value>
        <S.Icon className="text-brand-gray transition-transform duration-300 data-[popup-open]:rotate-180">
          <ChevronDown className="w-5 h-5" />
        </S.Icon>
      </S.Trigger>
      <S.Portal>
        <S.Positioner sideOffset={8} alignItemWithTrigger={false} className="z-[80] outline-none">
          <S.Popup className="bui-popup min-w-[var(--anchor-width)] rounded-xl border border-white/10 bg-[#101413]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
            {options.map((opt) => (
              <S.Item
                key={opt.value}
                value={opt.value}
                className="bui-item flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-brand-gray cursor-pointer select-none outline-none"
              >
                <S.ItemText>{opt.label}</S.ItemText>
                <S.ItemIndicator className="text-brand-cyan">
                  <Check className="w-4 h-4" />
                </S.ItemIndicator>
              </S.Item>
            ))}
          </S.Popup>
        </S.Positioner>
      </S.Portal>
    </S.Root>
  );
}
