// Constants for aplication

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

// Storage Keys for localStorage
export const STORAGE_KEYS = {
  favorites: 'movie-explorer-favorites',
  watchlist: 'movie-explorer-watchlist',
} as const;

// React Query keys
export const QUERY_KEYS = {
  movies: {
    all: ['movies'] as const,
    popular: (page: number) => ['movies', 'popular', page] as const,
    nowPlaying: (page: number) => ['movies', 'now-playing', page] as const,
    topRated: (page: number) => ['movies', 'top-rated', page] as const,
    upcoming: (page: number) => ['movies', 'upcoming', page] as const,
    trending: (page: number) => ['movies', 'trending', page] as const,
    details: (id: number) => ['movie', id] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
    genres: () => ['movies', 'genres'] as const,
    discover: (filter: object) => ['movies', 'discover', filter] as const,
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  popular: '/movie/popular',
  nowPlaying: '/movie/now_playing',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  trending: '/trending/movie/week',
  details: (id: number) => `/movie/${id}`,
  search: '/search/movie',
  genres: '/genre/movie/list',
  discover: '/discover/movie',
} as const;

// Pagination settings
export const DEFAULT_PAGE = 1;
export const RESULTS_PER_PAGE = 20;

// Genre IDs
export const GENRE_IDS = {
  ACTION: 28,
  DRAMA: 18,
  SCI_FI: 878,
  HORROR: 27,
  COMEDY: 35,
  ROMANCE: 10749,
  ANIMATION: 16,
  THRILLER: 53,
  CRIME: 80,
  ADVENTURE: 12,
} as const;

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Popularity (High → Low)', value: 'popularity.desc' },
  { label: 'Popularity (Low → High)', value: 'popularity.asc' },
  { label: 'Rating (High → Low)', value: 'vote_average.desc' },
  { label: 'Release Date (Newest)', value: 'release_date.desc' },
  { label: 'Release Date (Oldest)', value: 'release_date.asc' },
] as const;