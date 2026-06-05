import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Calendar, Heart } from 'lucide-react';
import { useSearchMovies } from '../hooks/useMovies';
import { useDebounce } from '../hooks/useDebounce';
import { useMovieStore } from '../store/movieStore';
import { useToast } from '../components/Toastprovider';
import { SearchBar } from '../components/SearchBar';
import { Footer } from '../components/Footer';
import { SearchEmpty, LoadingSpinner } from '../components/ErrorState';
import { cn, getPosterUrl, formatRating, formatDate } from '../lib/utils';
import { Button } from '../components/ui/Button';
import type { Movie } from '../types/movie';

//  Single Search Result Card 
function SearchResultCard({ movie }: { movie: Movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useMovieStore();
  const { showToast } = useToast();
  const faved = isFavorite(movie.id);
  const posterUrl = getPosterUrl(movie.poster_path);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (faved) {
      removeFavorite(movie.id);
      showToast(`"${movie.title}" removed from favorites`, 'remove');
    } else {
      addFavorite(movie);
      showToast(`"${movie.title}" added to favorites`, 'add');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-[var(--space-5)] py-[var(--space-6)] border-b border-[var(--color-gray-800)] last:border-0"
    >
      {/* Poster */}
      <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
        <div className="w-[104px] h-[156px] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface-muted)] hover:opacity-85 transition-opacity">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl opacity-20">
              🎬
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-bold text-[var(--color-gray-white)] hover:text-[var(--color-brand-red)] transition-colors mb-1.5 line-clamp-2">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center gap-[var(--space-4)] [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)] mb-3">
          <div className="flex items-center gap-1">
            <Star size={13} className="text-[var(--color-brand-gold)] fill-current" />
            <span className="font-medium text-[var(--color-gray-white)]">
              {formatRating(movie.vote_average)}/10
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>

        <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)] leading-relaxed mb-4 line-clamp-2 max-w-xl">
          {movie.overview}
        </p>

        <div className="flex items-center gap-[var(--space-3)]">
          <Link to={`/movie/${movie.id}`}>
            <Button size="default" className="gap-2">
              ▶ More Info
            </Button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleFavorite}
            aria-label="Toggle favorite"
            className={cn(
              'w-10 h-10 rounded-[var(--radius-full)] flex items-center justify-center border transition-colors',
              faved
                ? 'bg-[rgba(150,18,0,0.8)] border-[var(--color-brand-red)] text-[var(--color-gray-white)]'
                : 'bg-[rgba(10,13,18,0.6)] border-[var(--color-gray-900)] text-[var(--color-gray-white)] hover:border-[var(--color-gray-500)]'
            )}
          >
            <Heart size={14} className={cn(faved && 'fill-current')} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

//  Search Page 
export default function SearchPage() {
  const [rawQuery, setRawQuery] = useState('');
  const debouncedQuery = useDebounce(rawQuery, 400);

  const { data, isLoading, isFetching } = useSearchMovies(debouncedQuery);

  const handleSearch = useCallback((q: string) => {
    setRawQuery(q);
  }, []);

  const hasResults = data && data.results.length > 0;
  const noResults = data && data.results.length === 0 && debouncedQuery.length >= 2;
  const isSearching = isLoading || (isFetching && debouncedQuery.length >= 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen"
    >
      <div className="page-section">
        {/* Header */}
        <div className="mb-[var(--space-8)]">
          <h1 className="text-display-md font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-6)]">
            🔍 Search Movies
          </h1>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search movies by title…"
            autoFocus
            size="lg"
          />
        </div>

        {/* Total results count */}
        {debouncedQuery && data && hasResults && (
          <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)] mb-4">
            Found{' '}
            <span className="text-[var(--color-gray-white)] font-medium">
              {data.total_results.toLocaleString()}
            </span>{' '}
            result{data.total_results !== 1 ? 's' : ''} for "{debouncedQuery}"
          </p>
        )}

        {/* States */}
        {isSearching && <LoadingSpinner />}

        {!isSearching && debouncedQuery.length < 2 && (
          <div className="py-20 text-center text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)]">
            Start typing to find movies…
          </div>
        )}

        {noResults && !isSearching && <SearchEmpty query={debouncedQuery} />}

        {/* Results */}
        {hasResults && !isSearching && (
          <AnimatePresence mode="popLayout">
            <div>
              {data.results.map((movie) => (
                <SearchResultCard key={movie.id} movie={movie} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <Footer />
    </motion.div>
  );
}
