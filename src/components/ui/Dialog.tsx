import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      '[background-color:rgba(0,0,0,0.85)]',
      '[backdrop-filter:blur(8px)] [-webkit-backdrop-filter:blur(8px)]',
      'data-[state=open]:animate-fade-in',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50',
        'left-[50%] top-[50%]',
        'translate-x-[-50%] translate-y-[-50%]',
        'w-full max-w-4xl',
        // Surface
        'bg-[var(--color-surface)]',
        'border border-[var(--color-gray-800)]', 
        'rounded-[var(--radius-xl)]',
        'shadow-2xl overflow-hidden p-0',
        // Animate in
        'data-[state=open]:animate-fade-up',
        'focus:outline-none',
        className
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className={cn(
          'absolute right-[var(--space-4)] top-[var(--space-4)]',
          'rounded-[var(--radius-full)]',
          'opacity-70 hover:opacity-100',
          'transition-opacity',
          'focus:outline-none',
          'z-10'
        )}
        aria-label="Close"
      >
        <X
          className={cn(
            'text-[var(--color-gray-white)]',
            'w-[var(--space-5)] h-[var(--space-5)]'
          )}
        />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col',
      'space-y-[var(--space-1-5)]',
      'p-[var(--space-6)]', 
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end',
      'gap-[var(--space-2)]', 
      'p-[var(--space-6)] pt-0',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      '[font-family:var(--font-poppins)]',
      '[font-size:var(--fs-text-lg)]',
      '[line-height:var(--lh-text-lg)]',
      'font-semibold leading-none tracking-tight',
      'text-[var(--color-gray-white)]',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      '[font-family:var(--font-poppins)]',
      '[font-size:var(--fs-text-sm)]',
      '[line-height:var(--lh-text-sm)]',
      'text-[var(--color-gray-400)]',
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
