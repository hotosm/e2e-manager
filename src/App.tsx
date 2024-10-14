import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '@hotosm/ui/dist/style.css';

import AppRoutes from './routes';

const App = () => {
  return (
    <RouterProvider router={AppRoutes} />
  );
};

export default App;

