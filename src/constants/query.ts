import { QueryClient } from '@tanstack/react-query';

export const QUERY = {
  LOGIN: 'login',

  TAGS: 'tags',
  TAG: 'tag',
} as const;

export const queryClient = new QueryClient();
