import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      retryDelay: (n) => Math.min(1000 * 2 ** n, 10_000),
      refetchOnWindowFocus: false,
    },
    mutations: { retry: 0 },
  },
});
