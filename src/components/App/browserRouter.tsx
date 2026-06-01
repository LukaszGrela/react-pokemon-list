import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../Home/Home';

export const browserRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Navigate replace to="/1" />,
    },
    {
      path: '/index.html',
      element: <Navigate replace to="/1" />,
    },
    {
      path: '/:page',
      element: <Home />,
    },
  ]);
};
