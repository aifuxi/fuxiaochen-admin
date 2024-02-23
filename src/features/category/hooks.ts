import { useQuery } from '@tanstack/react-query';

import { QUERY, queryClient } from '@/constants/query.ts';

import { getCategories, getCategory } from './services';
import { GetCategoriesParams } from './types';

export const useGetCategories = (params: GetCategoriesParams) => {
  const queryKey = [QUERY.CATEGORIES, params];
  const { isLoading, data, isError } = useQuery({
    queryKey,
    queryFn: () => getCategories(params),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};

export const useGetCategory = (id: string) => {
  const queryKey = [QUERY.CATEGORY, id];
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getCategory(id),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};
