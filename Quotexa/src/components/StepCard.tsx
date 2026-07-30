import type { ReactNode } from 'react';
import { ChevronDown, Settings2 } from 'lucide-react';
import Collapsible from './Collapsible';

interface StepCardProps {
  step: string;
  title: string;
  icon: ReactNode;
  summary: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  delay?: number;
  label?: string;
}

export default function StepCard({
  step,
  title,
  icon,
  summary,
  open,
  onToggle,
  children,
  delay = 0,
  label = 'Change',
}: StepCardProps) {
  return (
    <section
      className={`theme-surface step-card animate-rise self-start overflow-hidden rounded-2xl ${
        open ? 'border-[var(--brand)]/45' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 p-4 sm:p-[18px]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
              open ? 'bg-[var(--brand)] text-[var(--brand-contrast)]' : 'bg-[var(--brand-soft)] text-[var(--brand)]'
            }`}
          >
            {icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{step}</span>
            <span className="font-display block text-[15px] font-bold leading-tight text-[var(--text)]">{title}</span>
            <span className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-soft)]">
              {summary}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-bold transition active:scale-[0.97] ${
            open
              ? 'border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-contrast)]'
              : 'border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--surface-3)]'
          }`}
        >
          <Settings2 size={14} className="hidden sm:block" />
          <span>{open ? 'Done' : label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <Collapsible open={open}>
        <div className="border-t border-[var(--border)] p-4 sm:p-[18px]">{children}</div>
      </Collapsible>
    </section>
  );
}
