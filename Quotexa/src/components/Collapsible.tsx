import type { ReactNode } from 'react';

interface CollapsibleProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Smoothly reveals content using the grid-rows 0fr -> 1fr technique,
 * which animates to the natural height without hard-coded max-heights.
 */
export default function Collapsible({ open, children, className = '' }: CollapsibleProps) {
  return (
    <div
      aria-hidden={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,0.7,0.25,1)] ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      } ${className}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
