import { z } from 'zod';

export const SearchSchema = z.object({
  q: z.string().min(3, 'Your search must be at least 3 characters long').max(100, 'Your search can\'t be longer than 100 characters'),
});

export type SearchSchema = z.infer<typeof SearchSchema>;
