import { Skeleton } from '../components/ui/Skeleton';

export function MovieCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={`movie-card flex-shrink-0 ${className ?? ''}`}>
      <Skeleton className="w-full aspect-poster rounded-[var(--radius-lg)]" />
      <div className="movie-card__info space-y-[var(--space-2)]">
        <Skeleton className="h-4 w-3/4 rounded-[var(--radius-sm)]" />
        <Skeleton className="h-3 w-1/2 rounded-[var(--radius-sm)]" />
      </div>
    </div>
  );
}

export function MovieCardSkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-[var(--space-5)] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
 