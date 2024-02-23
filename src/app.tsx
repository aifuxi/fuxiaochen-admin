import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { PATH } from '@/constants/path';
import { queryClient } from '@/constants/query.ts';

import { AppLayout } from '@/components/layout';
import { LoginPage } from '@/features/auth';
import { CategoryListPage } from '@/features/category';
import { HomePage } from '@/features/home';
import { CreatePostPage, EditPostPage, PostListPage } from '@/features/post';
import { TagListPage } from '@/features/tag';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <BrowserRouter basename={PATH.BASENAME}>
          <Routes>
            <Route path={PATH.LOGIN} element={<LoginPage />}></Route>
            <Route element={<AppLayout />}>
              <Route path={PATH.HOME} element={<HomePage />}></Route>

              <Route path={PATH.TAG} element={<TagListPage />}></Route>

              <Route path={PATH.CATEGORY} element={<CategoryListPage />}></Route>

              <Route path={PATH.POST} element={<PostListPage />}></Route>
              <Route path={PATH.POST_CREATE} element={<CreatePostPage />}></Route>
              <Route path={`${PATH.POST_EDIT}/:id`} element={<EditPostPage />}></Route>

              {/*兜底路由，所有未匹配到的路由显示HomePage*/}
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NiceModal.Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
