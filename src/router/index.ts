// 路由配置入口
// 路由守卫见 guards.tsx
import { lazy, createElement, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import PageLoading from '@/components/PageLoading'

import { AuthGuard, GuestGuard } from '@/router/guards'

const fullPageFallback = createElement(PageLoading, { fullPage: true })
const renderElement = (Component: React.ComponentType) =>
  createElement(Suspense, { fallback: fullPageFallback }, createElement(Component))

const Layout = lazy(() => import('@/layout/Layout'))
const LoginPage = lazy(() => import('@/views/Auth/Login'))
const HomePage = lazy(() => import('@/views/Home/Home'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: createElement(GuestGuard, null, renderElement(LoginPage)),
    handle: { title: '登录' },
  },
  {
    path: '/',
    element: createElement(AuthGuard, null, renderElement(Layout)),
    handle: { title: '主页' },
    children: [
      {
        index: true,
        element: renderElement(HomePage),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
