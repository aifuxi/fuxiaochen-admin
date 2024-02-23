import { QueryClient } from '@tanstack/react-query';

export const QUERY = {
  LOGIN: 'login',

  TAGS: 'tags',
  TAG: 'tag',

  CATEGORIES: 'categories',
  CATEGORY: 'category',
} as const;

export const queryClient = new QueryClient();
