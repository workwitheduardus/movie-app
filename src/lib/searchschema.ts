import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().min(1, 'Please enter a search term').max(100, 'Search term is too long').trim(),
});

export type { SearchFormValues } from '../types/movie';
