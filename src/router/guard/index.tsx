import React from 'react'
import { Await } from 'react-router-dom'

interface GuardProps {
  path: string
  children: React.ReactNode
}
export default function Guard({ path, children }: GuardProps): React.ReactNode {
  // Map 页面特殊处理
  if (path !== '/map') {
    return (
      <React.Suspense fallback={<div> Loading </div>}>
        {children}
      </React.Suspense>
    )
  }

  let propmise = null
  // eslint-disable-next-line no-constant-condition
  if (true) propmise = new Promise((resolve) => resolve('loaded'))

  return (
    <React.Suspense fallback={<div> Loading </div>}>
      <Await resolve={propmise}>{children}</Await>
    </React.Suspense>
  )
}
