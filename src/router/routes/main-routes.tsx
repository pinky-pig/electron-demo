import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { SplashScreen } from '@/components/loading-screen'
import { sitePaths } from '@/config/paths'
// Layout
import MainLayout from '@/layouts/default/index'

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/home/index'))
const AboutPage = lazy(() => import('@/pages/about-page'))
const CalendarPage = lazy(() => import('@/pages/calendar'))

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
    children: [
      { path: sitePaths.about, element: <AboutPage /> },
      { path: sitePaths.calendar, element: <CalendarPage /> },
    ],
  },
]
