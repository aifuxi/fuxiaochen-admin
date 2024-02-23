import { useImmer } from 'use-immer';

import { PageLayout } from '@/components/layout';
import { defaultParams } from '@/features/category/config.ts';

import { SearchForm, SearchTable } from '../components';
import { useGetPosts } from '../hooks.ts';
import { GetPostsParams } from '../types.ts';

export const PostListPage = () => {
  const [params, updateParams] = useImmer<GetPostsParams>(defaultParams);
  const { data, isLoading, invalidateQueries } = useGetPosts(params);

  return (
    <PageLayout title="文章列表">
      <div className="grid grid-cols-1 gap-y-3">
        <SearchForm updateParams={updateParams} />

        <SearchTable
          isLoading={isLoading}
          invalidateQueries={invalidateQueries}
          params={params}
          updateParams={updateParams}
          total={data?.total ?? 0}
          data={data?.data ?? []}
        />
      </div>
    </PageLayout>
  );
};
