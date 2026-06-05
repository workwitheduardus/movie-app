import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'lg' | 'sm';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = 'lg', ...props }, ref) => {
    const isLg = inputSize === 'lg';

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // Layout
          'flex w-full',
          // Background + border
          '[background-color:rgba(10,13,18,0.6)]',
          'border border-[var(--color-gray-800)]',
          '[backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)]',
          // Shape: Large
          isLg ? 'rounded-[var(--search-lg-r)]' : 'rounded-[var(--search-sm-r)]',
          // Height: Large
          isLg ? 'h-[var(--search-lg-h)]' : 'h-[var(--search-sm-h)]',
          // Spacing
          'px-[var(--space-4)]',
          // Typography
          '[font-family:var(--font-poppins)]',
          isLg
            ? '[font-size:var(--fs-text-md)] [line-height:var(--lh-text-md)]'
            : '[font-size:var(--fs-text-sm)] [line-height:var(--lh-text-sm)]',
          'text-[var(--color-gray-white)]',
          // Placeholder
          'placeholder:[color:var(--color-gray-500)]',
          // States
          'focus-visible:outline-none',
          'focus-visible:border-[var(--color-gray-500)]',
          'hover:border-[var(--color-gray-700)]',
          'transition-[border-color] duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Remove search decorations
          '[&::-webkit-search-decoration]:hidden',
          '[&::-webkit-search-cancel-button]:hidden',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
