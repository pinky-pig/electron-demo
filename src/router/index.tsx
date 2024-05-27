import { Navigate, useRoutes } from 'react-router-dom'

import { sitePaths } from '@/config/paths'
// layouts
import MainLayout from '@/layouts/main/layout'

import { appRoutes } from './routes/app-routes'
import { errorsRoutes } from './routes/errors-routes'
// config
import { HomePage, mainRoutes } from './routes/main-routes'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: sitePaths.home,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    ...mainRoutes,
    ...appRoutes,
    ...errorsRoutes,
    { path: '*', element: <Navigate to={sitePaths.page404} replace /> },
  ])
}
