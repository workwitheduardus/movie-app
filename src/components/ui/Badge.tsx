import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center',
    'rounded-[var(--radius-full)]',
    'px-[var(--space-3)] py-[var(--space-px)]',
    '[font-family:var(--font-poppins)]',
    '[font-size:var(--fs-text-xs)]',
    '[line-height:var(--lh-text-xs)]',
    'font-semibold',
    'transition-colors',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          '[background-color:rgba(150,18,0,0.15)]',
          'text-[#ff6b5b]',
          'border border-[var(--color-brand-red-400)]',
        ].join(' '),

        // Neutral
        secondary: [
          '[background-color:rgba(255,255,255,0.08)]',
          'text-[var(--color-gray-white)]',
          'border border-[var(--color-gray-800)]',
        ].join(' '),

        // Outline only
        outline: ['border border-[var(--color-gray-800)]', 'text-[var(--color-gray-400)]'].join(
          ' '
        ),

        // Gold — e.g. rating badge
        gold: [
          '[background-color:rgba(228,168,2,0.15)]',
          'text-[var(--color-brand-gold)]',
          'border border-[var(--color-brand-gold)]',
        ].join(' '),
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
