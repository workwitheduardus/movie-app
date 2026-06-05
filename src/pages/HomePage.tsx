import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { usePopularMovies, useNowPlayingMovies , useTrendingMovies, useTopRatedMovies, useGenres,
} from '../hooks/useMovies';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';
import { MovieCard } from '../components/MovieCard';
import { GenreFilter } from '../components/GenreFilter';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/ErrorState';

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
  
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function HomePage() {
  const [activeGenreId, setActiveGenreId] = useState(0);

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = usePopularMovies();
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlayingMovies();
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useTrendingMovies();
  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useTopRatedMovies();
  const { data: genres } = useGenres();

  const heroMovie = popularData?.results?.find((m) => m.backdrop_path);

  const filteredMovies =
    activeGenreId === 0
      ? nowPlayingData?.results
      : nowPlayingData?.results?.filter((m) => m.genre_ids.includes(activeGenreId));

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      {popularLoading ? (
        <div
          className="h-[520px] md:h-[600px] animate-pulse"
          style={{
            background:
              'linear-gradient(to bottom right, var(--color-brand-red-900), var(--color-surface), #000)',
          }}
        />
      ) : heroMovie ? (
        <HeroSection movie={heroMovie} />
      ) : null}

      {/* Trending */}
      <MovieRow
        title="🔥 Trending This Week"
        movies={trendingData?.results}
        isLoading={trendingLoading}
        isError={trendingError}
        showRank
      />

      {/* New Releases + Genre Filter */}
      <section className="py-[var(--space-10)]">
        <div className="page-section">
          <h2 className="text-display-sm font-bold tracking-tight text-[var(--color-gray-white)] mb-[var(--space-6)]">
            🎬 New Releases
          </h2>

          <GenreFilter genres={genres} activeGenreId={activeGenreId} onSelect={setActiveGenreId} />

          {nowPlayingLoading && <LoadingSpinner />}

          {filteredMovies && filteredMovies.length > 0 && (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[var(--space-5)]"
              variants={gridVariants}
              initial="hidden"
              animate="show"
            >
              {filteredMovies.slice(0, 12).map((movie) => (
                <motion.div key={movie.id} variants={gridItemVariants}>
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!nowPlayingLoading && filteredMovies?.length === 0 && (
            <p className="text-[var(--color-gray-400)] [font-size:var(--fs-text-sm)]">
              No movies in this genre right now.
            </p>
          )}
        </div>
      </section>

      {/* Top Rated */}
      <MovieRow
        title="⭐ Top Rated"
        movies={topRatedData?.results}
        isLoading={topRatedLoading}
        isError={topRatedError}
      />

      <Footer />
    </motion.div>
  );
}
 