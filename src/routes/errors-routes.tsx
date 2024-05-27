import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from '@/components/loading-screen';
import { sitePaths } from '@/configurations/paths';
import SimpleLayout from '@/layouts/simple/layout';

const Page500 = lazy(() => import('@/pages/general/500'));
const Page404 = lazy(() => import('@/pages/general/404'));
const Page403 = lazy(() => import('@/pages/general/403'));

// ----------------------------------------------------------------------

export const errorsRoutes = [
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      { path: sitePaths.page500, element: <Page500 /> },
      { path: sitePaths.page404, element: <Page404 /> },
      { path: sitePaths.page403, element: <Page403 /> },
    ],
  },
];
