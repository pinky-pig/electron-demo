import { Navigate, useRoutes } from 'react-router-dom'

import { sitePaths } from '@/config/paths'
// layouts
import DefaultLayout from '@/layouts/default/index'

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
        <DefaultLayout>
          <HomePage />
        </DefaultLayout>
      ),
    },
    ...mainRoutes,
    ...appRoutes,
    ...errorsRoutes,
    { path: '*', element: <Navigate to={sitePaths.page404} replace /> },
  ])
}
