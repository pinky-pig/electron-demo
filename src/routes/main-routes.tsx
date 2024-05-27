import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from '@/components/loading-screen';
import { sitePaths } from '@/configurations/paths';
// Layout
import MainLayout from '@/layouts/main/layout';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/home-page'));
const AboutPage = lazy(() => import('@/pages/about-page'));

const PageOne = lazy(() => import('@/pages/page-one'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [{ path: sitePaths.about, element: <AboutPage /> }],
  },
];
