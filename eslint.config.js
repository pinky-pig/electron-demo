import { arvinn } from '@arvinn/eslint-config'

export default arvinn([
  {
    rules: {
      'import/no-default-export': 'off',
      'node/prefer-global/process': 'off',
    },
  },
  {
    ignores: [
      'build/*',
      'dist/*',
      'public/*',
      '**/out/*',
      '**/node_modules/*',
      '**/.next/*',
      'next.config.js',
      'vite.config.js',
      'vite.config.ts',
      'src/reportWebVitals.js',
      'src/service-worker.js',
      'src/serviceWorkerRegistration.js',
      'src/setupTests.js',
      'src/reportWebVitals.ts',
      'src/service-worker.ts',
      'src/serviceWorkerRegistration.ts',
      'src/setupTests.ts',
    ],
  },
])
