import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {movieService} from '../services/movieService';
import { QUERY_KEYS } from '../lib/constants';
import type { MovieFilters } from '../types/movie';


// Movie Lists 
export const usePopularMovies = (page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn:  () => movieService.getPopularMovies(page),
  })
 
export const useNowPlayingMovies = (page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn:  () => movieService.getNowPlayingMovies(page),
  })
 
export const useTopRatedMovies = (page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.topRated(page),
    queryFn:  () => movieService.getTopRatedMovies(page),
  })
 
export const useUpcomingMovies = (page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.upcoming(page),
    queryFn:  () => movieService.getUpcomingMovies(page),
  })

export const useTrendingMovies = (page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.trending(page),
    queryFn:  () => movieService.getTrendingMovies(page),
  })
 
// Movie Detail
export const useMovieDetails = (movieId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.details(movieId),
    queryFn:  () => movieService.getMovieDetails(movieId),
    enabled:  !!movieId && movieId > 0,
  })
 
//  Search 
export const useSearchMovies = (query: string, page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn:  () => movieService.searchMovies(query, page),
    enabled:  query.trim().length >= 2,
    placeholderData: (prev) => prev,
  })
 
export const useInfiniteSearchMovies = (query: string) =>
  useInfiniteQuery({
    queryKey: [...QUERY_KEYS.movies.search(query, 1), 'infinite'],
    queryFn:  ({ pageParam = 1 }) =>
      movieService.searchMovies(query, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.trim().length >= 2,
  })
 
// ── Genres 
export const useGenres = () =>
  useQuery({
    queryKey: QUERY_KEYS.movies.genres(),
    // React Query v5 rejects undefined return — fallback to [] if API fails
    queryFn:  async () => {
      const genres = await movieService.getGenres()
      return genres ?? []
    },
    staleTime: Infinity,
  })
 
//  Discover / Filter 
export const useDiscoverMovies = (filters: MovieFilters = {}) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.discover(filters),
    queryFn:  () => movieService.discoverMovies(filters),
  })
 
export const useInfiniteDiscoverMovies = (filters: Omit<MovieFilters, 'page'> = {}) =>
  useInfiniteQuery({
    queryKey: [...QUERY_KEYS.movies.discover(filters), 'infinite'],
    queryFn:  ({ pageParam = 1 }) =>
      movieService.discoverMovies({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
