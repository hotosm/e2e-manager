import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Image from './views/Image/Image';
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
      {
        path: '/image',
        element: <Image />
      },
    ]
  },
]);

export default routes;
