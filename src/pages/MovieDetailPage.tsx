import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, ChevronLeft, Heart, Play, Users } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';
import { useMovieStore } from '../store/movieStore';
import { useToast } from '../components/Toastprovider';
import { MovieRow } from '../components/MovieRow';
import { Footer } from '../components/Footer';
import { ErrorState } from '../components/ErrorState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent } from '../components/ui/Dialog';
import { Skeleton } from '../components/ui/Skeleton';
import {
  cn,
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
  formatRating,
  formatRuntime,
  formatDate,
  getYoutubeEmbedUrl,
} from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const { data: movie, isLoading, isError, refetch } = useMovieDetails(movieId);
  const { isFavorite, addFavorite, removeFavorite } = useMovieStore();
  const faved = movie ? isFavorite(movie.id) : false;

  //  Loading 
  if (isLoading) {
    return (
      <div className="pt-24 page-section">
        <Skeleton className="w-full h-[480px] rounded-none" />
        <div className="flex gap-[var(--space-8)] mt-8">
          <Skeleton className="w-[200px] h-[300px] rounded-[var(--radius-xl)]" />
          <div className="flex-1 space-y-4 pt-36">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  //  Error 
  if (isError || !movie) {
    return (
      <ErrorState
        message="Could not load movie details."
        onRetry={() => refetch()}
        className="mt-32"
      />
    );
  }

  //  Data 
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const trailer =
    movie.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ??
    movie.videos?.results.find((v) => v.site === 'YouTube');
  const directors = movie.credits?.crew.filter((c) => c.job === 'Director') ?? [];
  const topCast = movie.credits?.cast.slice(0, 8) ?? [];

  const toggleFavorite = () => {
    if (faved) {
      removeFavorite(movie.id);
      showToast(`"${movie.title}" removed from favorites`, 'remove');
    } else {
      addFavorite({
        ...movie,
        genre_ids: movie.genres.map((g) => g.id),
      });
      showToast(`"${movie.title}" added to favorites`, 'add');
    }
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/*  Backdrop Hero  */}
      <div className="relative h-[480px] overflow-hidden">
        {backdropUrl && <img src={backdropUrl} alt="" className="backdrop-img" />}
        <div className="absolute inset-0 gradient-hero-bottom" />
        <div className="absolute inset-0 gradient-hero-left" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-[var(--page-px)] flex items-center gap-1.5 [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)] hover:text-[var(--color-gray-white)] transition-colors"
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>

      {/*  Main Content  */}
      <div className="page-section">
        {/* Poster + Info row */}
        <div className="flex flex-col md:flex-row gap-[var(--space-8)] -mt-32 relative z-10 mb-[var(--space-12)]">
          {/* Poster */}
          <div className="flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[300px] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-muted)] shadow-2xl">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                🎬
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 md:pt-36">
            {/* Genres */}
            <div className="flex gap-[var(--space-2)] flex-wrap mb-[var(--space-3)]">
              {movie.genres.map((g) => (
                <Badge key={g.id} variant="secondary">
                  {g.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-display-lg font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-2)]">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-[var(--color-gray-400)] italic mb-[var(--space-4)]">
                "{movie.tagline}"
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-[var(--space-4)] [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)] mb-[var(--space-6)] flex-wrap">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-[var(--color-brand-gold)] fill-current" />
                <span className="font-semibold text-[var(--color-gray-white)]">
                  {formatRating(movie.vote_average)}
                </span>
                <span>/ 10 ({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-8)]">
              {trailer && (
                <Button size="lg" className="gap-2" onClick={() => setTrailerOpen(true)}>
                  <Play size={16} className="fill-current" /> Watch Trailer
                </Button>
              )}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={toggleFavorite}
                aria-label="Toggle favorite"
                className={cn(
                  'h-[var(--btn-h-lg)] w-[var(--btn-h-lg)]',
                  'rounded-[var(--radius-full)]',
                  'flex items-center justify-center border transition-colors',
                  '[backdrop-filter:blur(20px)]',
                  faved
                    ? 'bg-[rgba(150,18,0,0.8)] border-[var(--color-brand-red)] text-[var(--color-gray-white)]'
                    : 'bg-[rgba(10,13,18,0.6)] border-[var(--color-gray-900)] text-[var(--color-gray-white)] hover:border-[var(--color-gray-500)]'
                )}
              >
                <Heart size={18} className={cn(faved && 'fill-current')} />
              </motion.button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-[var(--space-4)]">
              <div className="stat-card">
                <div className="stat-card__icon text-[var(--color-brand-gold)]">
                  <Star size={24} className="fill-current" />
                </div>
                <p className="stat-card__label">Rating</p>
                <p className="stat-card__value">{formatRating(movie.vote_average)}/10</p>
              </div>
              <div className="stat-card">
                <div className="stat-card__icon">
                  <Users size={24} className="text-[var(--color-gray-white)]" />
                </div>
                <p className="stat-card__label">Genre</p>
                <p className="stat-card__value">{movie.genres[0]?.name ?? 'N/A'}</p>
              </div>
              <div className="stat-card">
                <div className="stat-card__icon">
                  <Clock size={24} className="text-[var(--color-gray-white)]" />
                </div>
                <p className="stat-card__label">Runtime</p>
                <p className="stat-card__value">{formatRuntime(movie.runtime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Synopsis  */}
        <section className="mb-[var(--space-12)]">
          <h2 className="text-display-sm font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-4)]">
            Synopsis
          </h2>
          <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-md)] leading-relaxed max-w-3xl">
            {movie.overview}
          </p>
          {directors.length > 0 && (
            <p className="mt-4 [font-size:var(--fs-text-sm)] text-[var(--color-gray-400)]">
              <span className="text-[var(--color-gray-white)] font-medium">Directed by:</span>{' '}
              {directors.map((d) => d.name).join(', ')}
            </p>
          )}
        </section>

        {/*  Cast  */}
        {topCast.length > 0 && (
          <section className="mb-[var(--space-12)]">
            <h2 className="text-display-sm font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-6)]">
              Cast
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-4)]">
              {topCast.map((cast, i) => {
                const profileUrl = getProfileUrl(cast.profile_path);
                return (
                  <motion.div
                    key={cast.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className={[
                      'cast-card',
                      'border border-[var(--color-gray-800)] rounded-[var(--radius-xl)]',
                      'p-[var(--space-3)]',
                    ].join(' ')}
                    style={{ background: 'rgba(10,13,18,0.5)' }}
                  >
                    <div
                      className="overflow-hidden flex-shrink-0 bg-[var(--color-surface)]"
                      style={{
                        width: 'var(--cast-img-w-d)',
                        height: 'var(--cast-img-h-d)',
                        borderRadius: 'var(--cast-img-r-d)',
                      }}
                    >
                      {profileUrl ? (
                        <img
                          src={profileUrl}
                          alt={cast.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">
                          👤
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="cast-card__name">{cast.name}</p>
                      <p className="cast-card__role line-clamp-2">{cast.character}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/*  Similar & Recommendations  */}
      {(movie.similar?.results?.length ?? 0) > 0 && (
        <MovieRow title="Similar Movies" movies={movie.similar!.results} />
      )}
      {(movie.recommendations?.results?.length ?? 0) > 0 && (
        <MovieRow title="You Might Also Like" movies={movie.recommendations!.results} />
      )}

      <Footer />

      {/*  Trailer   */}
      {trailer && (
        <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[var(--radius-xl)] border-0">
            <div className="relative w-full aspect-video">
              <iframe
                src={getYoutubeEmbedUrl(trailer.key)}
                title={trailer.name}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}