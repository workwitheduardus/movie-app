import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Calendar, Trash2 } from 'lucide-react';
import { useFavorites, useMovieStore } from '@/store/movieStore';
import { useToast } from '../components/Toastprovider';
import { Footer } from '../components/Footer';
import { FavoritesEmpty } from '../components/ErrorState';
import { Button } from '../components/ui/Button';
import { getPosterUrl, formatRating, formatDate } from '../lib/utils';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function FavoritesPage() {
  const favorites = useFavorites();
  const { removeFavorite } = useMovieStore();
  const { showToast } = useToast();

  const handleRemove = (movieId: number, title: string) => {
    removeFavorite(movieId);
    showToast(`"${title}" removed from favorites`, 'remove');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen"
    >
      <div className="page-section">
        {/* Page header */}
        <div className="mb-[var(--space-8)]">
          <h1 className="text-display-md font-bold tracking-tight text-[var(--color-gray-white)]">
            ❤️ My Favorites
          </h1>
          <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)] mt-1.5">
            {favorites.length === 0
              ? 'No favorites yet'
              : `${favorites.length} movie${favorites.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <FavoritesEmpty />
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-[var(--color-gray-800)]"
          >
            {favorites.map((movie) => {
              const posterUrl = getPosterUrl(movie.poster_path);
              return (
                <motion.div
                  key={movie.id}
                  variants={itemVariants}
                  layout
                  className="flex items-start gap-[var(--space-6)] py-[var(--space-8)]"
                >
                  {/* Poster */}
                  <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                    <div className="w-[140px] h-[208px] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-surface-muted)] hover:opacity-90 transition-opacity">
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                          🎬
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/movie/${movie.id}`}>
                      <h2 className="text-2xl font-bold tracking-tight text-[var(--color-gray-white)] hover:text-[var(--color-brand-red)] transition-colors mb-2 line-clamp-2">
                        {movie.title}
                      </h2>
                    </Link>

                    <div className="flex items-center gap-[var(--space-4)] [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)] mb-3">
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-[var(--color-brand-gold)] fill-current" />
                        <span className="font-medium text-[var(--color-gray-white)]">
                          {formatRating(movie.vote_average)}/10
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>{formatDate(movie.release_date)}</span>
                      </div>
                    </div>

                    <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)] leading-relaxed mb-6 line-clamp-3 max-w-2xl">
                      {movie.overview}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-[var(--space-3)]">
                      <Link to={`/movie/${movie.id}`}>
                        <Button size="default" className="gap-2">
                          ▶ Watch Trailer
                        </Button>
                      </Link>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => handleRemove(movie.id, movie.title)}
                        aria-label={`Remove ${movie.title} from favorites`}
                        className={[
                          'w-10 h-10 rounded-[var(--radius-full)]',
                          'bg-[rgba(10,13,18,0.6)] border border-[var(--color-gray-800)]',
                          'flex items-center justify-center',
                          'hover:bg-[rgba(228,29,2,0.2)] hover:border-[var(--color-brand-red)]',
                          'transition-colors',
                        ].join(' ')}
                      >
                        <Trash2 size={15} className="text-[var(--color-gray-400)]" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <Footer />
    </motion.div>
  );
}
