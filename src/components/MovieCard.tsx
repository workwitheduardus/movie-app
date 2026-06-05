import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { cn, getPosterUrl, formatRating, getReleaseYear } from '../lib/utils';
import { useMovieStore } from '../store/movieStore';
import { useToast } from '../components/Toastprovider';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  className?: string;
}

export function MovieCard({ movie, rank, className }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useMovieStore();
  const { showToast } = useToast();
  const faved = isFavorite(movie.id);
  const posterUrl = getPosterUrl(movie.poster_path);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      className={cn('movie-card group relative', className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Poster area */}
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="movie-card__poster">
          {posterUrl && !imgError ? (
            <img
              src={posterUrl}
              alt={movie.title}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-4xl opacity-20">
              🎬
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rank badge */}
          {rank !== undefined && <div className="movie-card__rank">{rank}</div>}
        </div>
      </Link>

      {/* Favorite button — absolute over poster */}
      <motion.button
        onClick={handleFavorite}
        whileTap={{ scale: 0.85 }}
        aria-label={faved ? 'Remove from favorites' : 'Add to favorites'}
        className={cn(
          'absolute top-2.5 right-2.5 z-10',
          'w-9 h-9 rounded-[var(--radius-full)]',
          'flex items-center justify-center',
          'border transition-colors duration-200',
          '[backdrop-filter:blur(20px)]',
          faved
            ? 'bg-[var(--color-brand-900)] border-[var(--color-brand-red)] text-[var(--color-gray-white)]'
            : 'bg-[rgba(10,13,18,0.6)] border-[var(--color-gray-900)] text-[var(--color-gray-white)] hover:border-[var(--color-gray-500)]'
        )}
      >
        <Heart size={13} className={cn(faved && 'fill-current')} />
      </motion.button>

      {/* Info */}
      <div className="movie-card__info">
        <Link
          to={`/movie/${movie.id}`}
          className="movie-card__title block hover:text-[var(--color-brand-red)] transition-colors duration-200"
        >
          {movie.title}
        </Link>
        <div className="movie-card__rating">
          <Star size={13} className="movie-card__star fill-current" />
          <span className="movie-card__rating-text">
            {formatRating(movie.vote_average)} · {getReleaseYear(movie.release_date)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
