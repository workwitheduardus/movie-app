import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    // Layout
    'inline-flex items-center justify-center flex-shrink-0',
    'gap-[var(--space-2)]',
    'whitespace-nowrap cursor-pointer',
    // Typography
    '[font-family:var(--font-poppins)]',
    'font-semibold',
    // Shape
    'rounded-[var(--radius-full)]',
    'border-0',
    // Transition & accessibility
    'transition-[background-color,border-color,opacity,transform] duration-200',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-[var(--color-brand-red)]',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Default
        default: [
          'bg-[var(--color-brand-red)]',
          'text-[var(--color-gray-white)]',
          'hover:bg-[var(--color-brand-red-900)]',
        ].join(' '),

      // Secondary
        secondary: [
          '[background-color:rgba(10,13,18,0.6)]',
          'text-[var(--color-gray-white)]',
          'border border-[var(--color-gray-800)]',
          '[backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)]',
          'hover:border-[var(--color-gray-500)]',
        ].join(' '),

        // Ghost:
        ghost: [
          'text-[var(--color-gray-white)]',
          'hover:[background-color:rgba(255,255,255,0.1)]',
        ].join(' '),

        // Destructive 
        destructive: ['bg-destructive text-destructive-foreground', 'hover:opacity-90'].join(' '),

        // Link 
        link: [
          'text-[var(--color-brand-red)]',
          'underline-offset-4 hover:underline',
          'rounded-none',
        ].join(' '),

        // Icon
        icon: [
          '[background-color:rgba(10,13,18,0.6)]',
          'text-[var(--color-gray-white)]',
          'border border-[var(--color-gray-900)]',
          '[backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)]',
          'hover:border-[var(--color-gray-500)]',
          'active:scale-[0.88]',
        ].join(' '),

        //Icon
        'icon-active': [
          '[background-color:rgba(150,18,0,0.8)]',
          'text-[var(--color-gray-white)]',
          'border border-[var(--color-brand-red)]',
          '[backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)]',
          'active:scale-[0.88]',
        ].join(' '),
      },

      size: {
        //Large
        lg: [
          'h-[var(--btn-h-lg)]',
          'px-[var(--space-5)]',
          '[font-size:var(--fs-text-md)]',
          '[line-height:var(--lh-text-md)]',
        ].join(' '),

        // Default
        default: [
          'h-[var(--btn-h-sm)]',
          'px-[var(--space-4)]',
          '[font-size:var(--fs-text-sm)]',
          '[line-height:var(--lh-text-sm)]',
        ].join(' '),

        // Small
        sm: ['h-[38px]', 'px-[var(--space-3)]', '[font-size:13px]'].join(' '),

        // Icon
        icon: ['h-[var(--btn-icon)]', 'w-[var(--btn-icon)]'].join(' '),
        'icon-sm': ['h-[var(--btn-h-sm)]', 'w-[var(--btn-h-sm)]'].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
