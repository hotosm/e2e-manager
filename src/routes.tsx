import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import MainView from './views/MainView';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainView />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  },
]);

export default routes;
