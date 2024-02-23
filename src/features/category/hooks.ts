import { useQuery } from '@tanstack/react-query';

import { QUERY } from '@/constants/query.ts';

import { getCategories } from './services';
import { GetCategoriesParams } from './types';

export const useGetCategories = (params: GetCategoriesParams) => {
  const queryKey = [QUERY.CATEGORIES, params];
  const { isLoading, data, isError } = useQuery({
    queryKey,
    queryFn: () => getCategories(params),
  });

  return { isLoading, data, isError, queryKey };
};
