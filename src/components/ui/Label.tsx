import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  [
    '[font-family:var(--font-poppins)]',
    '[font-size:var(--fs-text-sm)]',
    '[line-height:var(--lh-text-sm)]',
    'font-medium',
    'text-[var(--color-gray-white)]',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ].join(' ')
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
