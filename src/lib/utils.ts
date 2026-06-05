import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IMAGE_SIZES } from './constants';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image URL Helper
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export function getImageUrl(
  path: string | null | undefined,
  size: string = IMAGE_SIZES.poster.large
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}


// Movie poster — (medium)
export function getPosterUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.poster.medium)
}

//Movie poster — (large)
export function getPosterUrlLg(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.poster.large)
}

// Movie backdrop — (medium)
export function getBackdropUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.backdrop.medium)
}

// Movie backdrop — (high quality)
export function getBackdropUrlLg(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.backdrop.large)
}

// Cast/crew profile photo 
export function getProfileUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.profile.medium)
}

// Format
export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getReleaseYear(dateStr: string | null | undefined): string {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).getFullYear().toString();
}

export function formatMoney(amount: number | null | undefined): string {
  if (!amount || amount === 0) return 'N/A';
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  return `$${amount.toLocaleString()}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

// Youtube embed URL helper
export function getYoutubeEmbedUrl(key: string): string {
  return `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
}

// Youtube thumbnail URL helper
export function getYoutubeThumbnail(key: string): string {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
}
