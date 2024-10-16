import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Image from './views/Image/Image';
import Mapping from './views/Mapping/Mapping';
import Use from './views/Use/Use';
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
      {
        path: '/mapping',
        element: <Mapping />
      },
      {
        path: '/use',
        element: <Use />
      },
    ]
  },
]);

export default routes;
