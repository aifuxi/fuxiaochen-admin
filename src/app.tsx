import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { PATH } from '@/constants/path';
import { queryClient } from '@/constants/query.ts';

import Layout from '@/components/layout';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import TagListPage from '@/pages/tag';
import TestPage from '@/pages/test/testPage';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <BrowserRouter basename={PATH.BASENAME}>
          <Routes>
            <Route path={PATH.LOGIN} element={<LoginPage />}></Route>
            <Route element={<Layout />}>
              <Route path={PATH.HOME} element={<HomePage />}></Route>
              <Route path={PATH.TEST} element={<TestPage />}></Route>
              <Route path={PATH.TAG} element={<TagListPage />}></Route>
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NiceModal.Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
