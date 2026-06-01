import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './browserRouter';

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={browserRouter()} />
    // <Routes>
    //   <Route path="/index.html" element={<Navigate replace to="/1" />} />
    //   <Route path="/" element={<Navigate replace to="/1" />} />
    //   <Route path="/:page" element={<Home />} />
    // </Routes>
  );
};

export default AppRouter;
