import { useQuery } from '@tanstack/react-query';

import { QUERY, queryClient } from '@/constants/query.ts';

import { getPost, getPosts } from './services';
import { GetPostsParams } from './types';

export const useGetPosts = (params: GetPostsParams) => {
  const queryKey = [QUERY.POSTS, params];
  const { isLoading, data, isError } = useQuery({
    queryKey,
    queryFn: () => getPosts(params),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};

export const useGetPost = (id: string) => {
  const queryKey = [QUERY.POST, id];
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getPost(id),
  });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return { isLoading, data, isError, queryKey, invalidateQueries };
};
