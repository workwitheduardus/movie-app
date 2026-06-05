import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie, FavoriteMovie, WatchlistMovie, MovieStoreState } from '../types/movie';
import { STORAGE_KEYS } from '../lib/constants';

export const useMovieStore = create<MovieStoreState>()(
  persist(
    (set, get) => ({
      // Initial
      favorites: [],
      watchlist: [],

      //  Favorites 
      addFavorite: (movie: Movie) => {
        if (get().isFavorite(movie.id)) return;
        const item: FavoriteMovie = { ...movie, added_at: Date.now() };
        set((state) => ({ favorites: [item, ...state.favorites] }));
      },

      removeFavorite: (movieId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        }));
      },

      isFavorite: (movieId: number): boolean => {
        return get().favorites.some((m) => m.id === movieId);
      },

      clearFavorites: () => set({ favorites: [] }),

      //  Watchlist 
      addToWatchlist: (movie: Movie) => {
        if (get().isInWatchlist(movie.id)) return;
        const item: WatchlistMovie = { ...movie, added_at: Date.now() };
        set((state) => ({ watchlist: [item, ...state.watchlist] }));
      },

      removeFromWatchlist: (movieId: number) => {
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        }));
      },

      isInWatchlist: (movieId: number): boolean => {
        return get().watchlist.some((m) => m.id === movieId);
      },

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      name: STORAGE_KEYS.favorites,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    }
  )
);

// Favorite
export const useFavorites = () => useMovieStore((s) => s.favorites);
export const useFavoriteCount = () => useMovieStore((s) => s.favorites.length);
export const useIsFavorite = (id: number) => useMovieStore((s) => s.isFavorite(id));
export const useAddFavorite = () => useMovieStore((s) => s.addFavorite);
export const useRemoveFavorite = () => useMovieStore((s) => s.removeFavorite);

// Watchlist
export const useWatchlist = () => useMovieStore((s) => s.watchlist);
export const useWatchlistCount = () => useMovieStore((s) => s.watchlist.length);
export const useIsInWatchlist = (id: number) => useMovieStore((s) => s.isInWatchlist(id));
export const useAddToWatchlist = () => useMovieStore((s) => s.addToWatchlist);
export const useRemoveFromWatchlist = () => useMovieStore((s) => s.removeFromWatchlist);
