import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '@/pages/login';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
  ],
  {
    basename: '/admin',
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
