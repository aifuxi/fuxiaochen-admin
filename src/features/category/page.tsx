import { useImmer } from 'use-immer';

import { PageLayout } from '@/components/layout';

import { SearchForm, SearchTable } from './components';
import { defaultParams } from './config.ts';
import { useGetCategories } from './hooks';
import { GetCategoriesParams } from './types';

export const CategoryListPage = () => {
  const [params, updateParams] = useImmer<GetCategoriesParams>(defaultParams);
  const { data, isLoading, invalidateQueries } = useGetCategories(params);

  return (
    <PageLayout title="文章分类">
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
