import { useQuery } from '@tanstack/react-query';

import { QUERY, queryClient } from '@/constants/query.ts';

import { getTag, getTags } from './services';
import { GetTagsParams } from './types';

export const useGetTags = (params: GetTagsParams) => {
  const queryKey = [QUERY.TAGS, params];
  const { isLoading, data, isError } = useQuery({
    queryKey,
    queryFn: () => getTags(params),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};

export const useGetTag = (id: string) => {
  const queryKey = [QUERY.CATEGORY, id];
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getTag(id),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};
