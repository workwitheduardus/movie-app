import { cn } from '@/lib/utils';
import type { Genre } from '../types/movie';

const ALL_GENRE: Genre = { id: 0, name: 'All' };

interface GenreFilterProps {
  genres?: Genre[];
  activeGenreId: number;
  onSelect: (genreId: number) => void;
}

export function GenreFilter({ genres = [], activeGenreId, onSelect }: GenreFilterProps) {
  const allGenres = [ALL_GENRE, ...genres];

  return (
    <div className="flex gap-[var(--space-2)] flex-wrap mb-[var(--space-8)]">
      {allGenres.map((genre) => {
        const isActive = genre.id === activeGenreId;
        return (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className={cn(
              'px-[var(--space-4)] py-[var(--space-1-5)]',
              'rounded-[var(--radius-full)]',
              '[font-family:var(--font-poppins)]',
              '[font-size:var(--fs-text-sm)]',
              'font-medium border transition-colors duration-200',
              isActive
                ? 'border-[var(--color-brand-red)] text-[#ff6b5b] bg-[rgba(150,18,0,0.12)]'
                : 'border-[var(--color-gray-800)] text-[var(--color-gray-400)] hover:border-[var(--color-gray-600)] hover:text-[var(--color-gray-white)]'
            )}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
}
