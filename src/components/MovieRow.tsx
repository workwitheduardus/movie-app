import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeletonRow } from '../components/MovieCardSkeleton';
import { ErrorState } from '../components/ErrorState';
import type { Movie } from '../types/movie';



interface MovieRowProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  isError?: boolean;
  showRank?: boolean;
  onRetry?: () => void;
}

export function MovieRow({ title, movies, isLoading, isError, showRank, onRetry }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  };

  return (
    <section className="py-[var(--space-10)]">
      <div className="page-section">
        {/* Section header */}
        <div className="flex items-center justify-between mb-[var(--space-8)]">
          <h2 className="text-display-sm font-bold tracking-tight text-[var(--color-gray-white)]">
            {title}
          </h2>
          <button
            onClick={scrollRight}
            className="flex items-center gap-1 [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)] hover:text-[var(--color-gray-white)] transition-colors"
          >
            See all <ChevronRight size={16} />
          </button>
        </div>

        {isError && <ErrorState message="Failed to load movies." onRetry={onRetry} />}
        {isLoading && <MovieCardSkeletonRow />}

        {movies && movies.length > 0 && (
          <div className="relative">
            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex gap-[var(--space-5)] overflow-x-auto pb-2 scrollbar-hide"
            >
              {movies.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} rank={showRank ? i + 1 : undefined} />
              ))}
            </div>

            {/* Fade-out */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 fade-right" />

            {/* Scroll button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollRight}
              aria-label="Scroll right"
              className={[
                'absolute right-4 top-1/2 -translate-y-1/2 z-10',
                'h-[var(--arrow-size)] w-[var(--arrow-size)]',
                'rounded-[var(--radius-full)]',
                'bg-[rgba(10,13,18,0.7)] [backdrop-filter:blur(20px)]',
                'border border-[var(--color-gray-800)]',
                'flex items-center justify-center',
                'hover:bg-[rgba(10,13,18,0.9)] transition-colors',
              ].join(' ')}
            >
              <ChevronRight size={22} className="text-[var(--color-gray-white)]" />
            </motion.button>
          </div>
        )}

        {!isLoading && !isError && movies?.length === 0 && (
          <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)]">
            No movies found.
          </p>
        )}
      </div>
    </section>
  );
}
 