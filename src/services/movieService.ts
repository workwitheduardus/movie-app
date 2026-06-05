import api from '@/lib/axios';
import { API_ENDPOINTS } from '../lib/constants';
import type { MovieDetail, MoviesResponse, Genre, MovieFilters } from '../types/movie';

// Response
interface GenresResponse {
  genres: Genre[];
}

// Movie Service
export const movieService = {
  getPopularMovies: async (page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.popular, {
      params: { page },
    });
    return data;
  },

  getNowPlayingMovies: async (page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.nowPlaying, {
      params: { page },
    });
    return data;
  },

  getTopRatedMovies: async (page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.topRated, {
      params: { page },
    });
    return data;
  },

  getUpcomingMovies: async (page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.upcoming, {
      params: { page },
    });
    return data;
  },

  getTrendingMovies: async (page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.trending, {
      params: { page },
    });
    return data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetail> => {
    const { data } = await api.get<MovieDetail>(API_ENDPOINTS.details(movieId), {
      params: { append_to_response: 'videos,credits,similar,recommendations' },
    });
    return data;
  },

  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.search, {
      params: { query: query.trim(), page, include_adult: false },
    });
    return data;
  },

  getGenres: async (): Promise<Genre[]> => {
    const { data } = await api.get<GenresResponse>(API_ENDPOINTS.genres);
    return data.genres;
  },

  discoverMovies: async (filters: MovieFilters = {}): Promise<MoviesResponse> => {
    const { genre, sort = 'popularity.desc', year, page = 1 } = filters;
    const { data } = await api.get<MoviesResponse>(API_ENDPOINTS.discover, {
      params: {
        with_genres: genre || undefined,
        sort_by: sort,
        primary_release_year: year || undefined,
        page,
        include_adult: false,
        'vote_count.gte': 50,
      },
    });
    return data;
  },
};

export default movieService;