import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { SplashScreen } from '@/components/loading-screen'
import { sitePaths } from '@/config/paths'
// Layout
import MainLayout from '@/layouts/default/index'

// ----------------------------------------------------------------------

const PageOne = lazy(() => import('@/pages/page-one'))

// ----------------------------------------------------------------------

export const appRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [{ path: sitePaths.pageOne, element: <PageOne /> }],
  },
]
