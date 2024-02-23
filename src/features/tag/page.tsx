import { useImmer } from 'use-immer';

import { PageLayout } from '@/components/layout';

import { SearchForm, SearchTable } from './components';
import { defaultParams } from './config.ts';
import { useGetTags } from './hooks';
import { GetTagsParams } from './types';

export const TagListPage = () => {
  const [params, updateParams] = useImmer<GetTagsParams>(defaultParams);
  const { data, isLoading, invalidateQueries } = useGetTags(params);

  return (
    <PageLayout title="文章标签">
      <div className="grid grid-cols-1 gap-y-3">
        <SearchForm invalidateQueries={invalidateQueries} updateParams={updateParams} />

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
