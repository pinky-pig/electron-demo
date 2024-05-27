import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { SplashScreen } from '@/components/loading-screen'
import { sitePaths } from '@/config/paths'
// Layout
import MainLayout from '@/layouts/main/layout'

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/home-page'))
const AboutPage = lazy(() => import('@/pages/about-page'))

// eslint-disable-next-line unused-imports/no-unused-vars
const PageOne = lazy(() => import('@/pages/page-one'))

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
]
