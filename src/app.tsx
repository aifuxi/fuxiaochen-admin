import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PATH } from '@/constants/path';

import Layout from '@/components/layout';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import TestPage from '@/pages/test/testPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={PATH.BASENAME}>
        <Routes>
          <Route path={PATH.LOGIN} element={<LoginPage />}></Route>
          <Route element={<Layout />}>
            <Route path={PATH.HOME} element={<HomePage />}></Route>
            <Route path={PATH.TEST} element={<TestPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
