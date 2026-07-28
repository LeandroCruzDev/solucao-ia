import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/layout/RouterLayout';
import { SimulationFormPage } from './pages/SimulationFormPage';
import { SimulationResultsPage } from './pages/SimulationResultsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SimulationHistoryDetailPage } from './pages/SimulationHistoryDetailPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SimulationFormPage />,
      },
      {
        path: '/resultado/:id',
        element: <SimulationResultsPage />,
      },
      {
        path: '/historico',
        element: <HistoryPage />,
      },
      {
        path: '/historico/:id',
        element: <SimulationHistoryDetailPage />,
      },
    ],
  },
]);
