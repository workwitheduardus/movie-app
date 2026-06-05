import { motion } from 'framer-motion';
import { AlertCircle, SearchX, Clapperboard, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';

// Error State 
interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}
 
export function ErrorState({ message = 'Something went wrong.', onRetry, className }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center gap-[var(--space-4)',
        className
      )}
    >
      <AlertCircle size={48} className="text-[var(--color-brand-red)] opacity-60" />
      <div>
        <p className="font-semibold text-[var(--color-gray-white)] [font-size:var(--fs-text-md)]">{message}</p>
        <p className="text-[var(--color-gray-400)] text-sm mt-1">Please try again later.</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} size="default" className="mt-2 gap-2">
          <RefreshCw size={14} /> Try Again
        </Button>
      )}
    </motion.div>
  );
}
 
// Search Empty 
export function SearchEmpty({ query, className }: { query: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center py-20 text-center gap-4', className)}
    >
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <Clapperboard size={110} className="opacity-50" style={{ color: '#456188' }} />
        <div className="absolute bottom-4 right-6">
          <SearchX size={44} className="opacity-60" style={{ color: '#9AAAB4' }} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-2)]">
        <p
          className="font-semibold text-[var(--color-gray-white)]"
          style={{ fontSize: 'var(--fs-text-md)', lineHeight: 'var(--lh-text-md)' }}
        >
          Data Not Found
        </p>
        <p
          className="text-[var(--color-gray-400)]"
          style={{ fontSize: 'var(--fs-text-sm)', lineHeight: 'var(--lh-text-sm)' }}
        >
          Try other keywords
        </p>
      </div>
    </motion.div>
  );
}

// Favorites Empty
export function FavoritesEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
    >
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <Clapperboard size={120} className="opacity-50" style={{ color: '#456188' }} />
      </div>
      <div className="flex flex-col items-center gap-[var(--space-2)]">
        <p
          className="font-semibold text-[var(--color-gray-white)]"
          style={{ fontSize: 'var(--fs-text-md)', lineHeight: 'var(--lh-text-md)' }}
        >
          Data Empty
        </p>
        <p
          className="text-[var(--color-gray-400)]"
          style={{ fontSize: 'var(--fs-text-sm)', lineHeight: 'var(--lh-text-sm)' }}
        >
          You don't have a favorite movie yet
        </p>
      </div>
      <Link to="/">
        <Button size="lg" style={{ width: '300px' }}>
          Explore Movie
        </Button>
      </Link>
    </motion.div>
  );
}
 
// Loading Spinner 
export function LoadingSpinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width:size,
          height:size,
          borderRadius: '50%',
          border:'2px solid rgba(255,255,255,0.1)',
          borderTopColor: 'var(--color-brand-red)',
        }}
      />
    </div>
  )
}