import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { searchSchema, type SearchFormValues } from '../lib/searchschema';

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  size?: 'lg' | 'sm';
  className?: string;
}

export function SearchBar({
  defaultValue = '',
  onSearch,
  placeholder = 'Search movies…',
  autoFocus = false,
  size = 'lg',
  className,
}: SearchBarProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultValue },
  });

  const query = watch('query');

  useEffect(() => {
    setValue('query', defaultValue);
  }, [defaultValue, setValue]);

  // Live search
  useEffect(() => {
    onSearch(query ?? '');
  }, [query, onSearch]);

  const onSubmit = (values: SearchFormValues) => {
    onSearch(values.query);
  };

  const handleClear = useCallback(() => {
    reset();
    onSearch('');
  }, [reset, onSearch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative w-full max-w-2xl', className)}
      role="search"
    >
      <div className={cn('search-bar', size === 'lg' ? 'search-bar--lg' : 'search-bar--sm')}>
        <Search
          size={size === 'lg' ? 18 : 15}
          className="text-[var(--color-gray-500)] flex-shrink-0"
          aria-hidden="true"
        />

        <input
          {...register('query')}
          type="search"
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          className="search-bar__input"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={[
              'w-6 h-6 flex items-center justify-center flex-shrink-0',
              'rounded-[var(--radius-full)]',
              'bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.25)]',
              'transition-colors',
            ].join(' ')}
            aria-label="Clear search"
          >
            <X size={12} className="text-[var(--color-gray-white)]" />
          </button>
        )}
      </div>

      {errors.query && (
        <p className="mt-1.5 [font-size:var(--fs-text-xs)] text-[var(--color-brand-red)] pl-4">
          {errors.query.message}
        </p>
      )}
    </form>
  );
}