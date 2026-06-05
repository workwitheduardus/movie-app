// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

// Movie Types
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  adult: boolean;
  video: boolean;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
  status: string;
  budget: number;
  revenue: number;
  original_language: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  homepage: string | null;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  videos?: { results: Video[] };
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  similar?: PaginatedResponse<Movie>;
  recommendations?: PaginatedResponse<Movie>;
}


export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

// API Types
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MoviesResponse = PaginatedResponse<Movie>;

// Store / State Types
export interface FavoriteMovie extends Movie {
  added_at: number; 
}

export interface WatchlistMovie extends Movie {
  added_at: number;
}


export interface MovieStoreState {
  // Favorites
  favorites: FavoriteMovie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;

  // Watchlist
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}

// Filter & Search Types
export type SortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'release_date.desc'
  | 'release_date.asc';

export interface MovieFilters {
  genre?: number;
  sort?: SortOption;
  year?: number;
  page?: number;
}

export interface SearchFormValues {
  query: string;
}