import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden',
      'rounded-[var(--radius-md)]',
      'border border-[var(--color-gray-800)]',
      'bg-[var(--color-surface)]',
      'px-[var(--space-3)] py-[var(--space-1-5)]',
      '[font-family:var(--font-poppins)]',
      '[font-size:var(--fs-text-xs)]', 
      '[line-height:var(--lh-text-xs)]', 
      'text-[var(--color-gray-white)]', 
      'shadow-md',
      'animate-fade-in',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
