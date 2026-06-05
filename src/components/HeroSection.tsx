import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Info, Star, Calendar, Heart } from 'lucide-react';
import { cn, getBackdropUrl, formatRating, formatDate } from '../lib/utils';
import { useMovieStore } from '../store/movieStore';
import { useToast } from '../components/Toastprovider';
import { Button } from '../components/ui/Button';
import type { Movie } from '../types/movie';

interface HeroSectionProps {
  movie: Movie;
}
 
export function HeroSection({ movie }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false)
  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const { isFavorite, addFavorite, removeFavorite } = useMovieStore()
  const { showToast } = useToast()
  const faved = isFavorite(movie.id)
 
  const toggleFavorite = () => {
    if (faved) {
      removeFavorite(movie.id)
      showToast(`"${movie.title}" removed from favorites`, 'remove')
    } else {
      addFavorite(movie)
      showToast(`"${movie.title}" added to favorites`, 'add')
    }
  }
 
  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden" style={{ marginTop: "calc(-1 * var(--header-h-d))" }}>
      {/* Backdrop image */}
      {backdropUrl && !imgError ? (
        <img
          src={backdropUrl}
          alt=""
          className="backdrop-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-red-900)] via-[var(--color-surface)] to-black" />
      )}
 
      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-hero-bottom" />
      <div className="absolute inset-0 gradient-hero-left" />
 
      {/* Content */}
      <div className="relative h-full page-section flex flex-col justify-end pb-[var(--space-20)]">
        <motion.div
          className="max-w-[560px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Badge */}
          <span className={[
            'inline-block mb-[var(--space-4)]',
            'bg-[var(--color-brand-red)] text-[var(--color-gray-white)]',
            'text-[11px] font-semibold uppercase tracking-wide',
            'px-[var(--space-3)] py-[var(--space-px)]',
            'rounded-[var(--radius-full)]',
          ].join(' ')}>
            🔥 Featured
          </span>
 
          {/* Title */}
          <h1 className="text-display-xl font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-3)]">
            {movie.title}
          </h1>
 
          {/* Meta row */}
          <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)] flex-wrap">
            <div className="flex items-center gap-1.5 [font-size:var(--fs-text-sm)]">
              <Star size={14} className="text-[var(--color-brand-gold)] fill-current" />
              <span className="font-medium text-[var(--color-gray-white)]">
                {formatRating(movie.vote_average)}
              </span>
              <span className="text-[var(--color-gray-400)]">/ 10</span>
            </div>
            <div className="w-px h-3.5 bg-[var(--color-gray-800)]" />
            <div className="flex items-center gap-1.5 [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)]">
              <Calendar size={13} />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          </div>
 
          {/* Overview */}
          <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-md)] leading-relaxed mb-[var(--space-8)] line-clamp-3">
            {movie.overview}
          </p>
 
          {/* CTA buttons */}
          <div className="flex items-center gap-[var(--space-3)]">
            <Link to={`/movie/${movie.id}`}>
              <Button size="lg" className="gap-2">
                <Play size={16} className="fill-current" aria-hidden="true" />
                Watch Trailer
              </Button>
            </Link>
 
            <Link to={`/movie/${movie.id}`}>
              <Button variant="secondary" size="lg" className="gap-2">
                <Info size={16} aria-hidden="true" />
                More Info
              </Button>
            </Link>
 
            {/* Favorite icon button */}
            <motion.button
              onClick={toggleFavorite}
              whileTap={{ scale: 0.88 }}
              aria-label={faved ? 'Remove from favorites' : 'Add to favorites'}
              className={cn(
                'h-[var(--btn-h-lg)] w-[var(--btn-h-lg)]',
                'rounded-[var(--radius-full)]',
                'flex items-center justify-center',
                'border transition-colors duration-200',
                '[backdrop-filter:blur(20px)]',
                faved
                  ? 'bg-[rgba(150,18,0,0.8)] border-[var(--color-brand-red)] text-[var(--color-gray-white)]'
                  : 'bg-[rgba(10,13,18,0.6)] border-[var(--color-gray-900)] text-[var(--color-gray-white)] hover:border-[var(--color-gray-500)]',
              )}
            >
              <Heart size={18} className={cn(faved && 'fill-current')} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}