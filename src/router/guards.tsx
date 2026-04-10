import type { JSX, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth'

export function AuthGuard({ children }: { children: ReactNode }): JSX.Element {
  const token = useAuthStore((state) => state.token)
  const location = useLocation()

  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return <>{children}</>
}

export function GuestGuard({ children }: { children: ReactNode }): JSX.Element {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
