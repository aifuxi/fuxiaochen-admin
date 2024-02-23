import { useQuery } from '@tanstack/react-query';

import { QUERY } from '@/constants/query.ts';

import { getTags } from './services';
import { GetTagsParams } from './types';

export const useGetTags = (params: GetTagsParams) => {
  const queryKey = [QUERY.TAGS, params];
  const { isLoading, data, isError } = useQuery({
    queryKey,
    queryFn: () => getTags(params),
  });

  return { isLoading, data, isError, queryKey };
};
