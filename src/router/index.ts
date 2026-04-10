// 路由配置入口
// 路由守卫请单独放 guards.ts
import { lazy, createElement, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import PageLoading from '@/components/PageLoading'

const AppLayout = lazy(() => import('@/App'))
const LoginPage = lazy(() => import('@/views/Auth/Login'))
const HomePage = lazy(() => import('@/views/Home/Home'))

const fullPageFallback = createElement(PageLoading, { fullPage: true })

const renderElement = (Component: React.ComponentType) =>
  createElement(Suspense, { fallback: fullPageFallback }, createElement(Component))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: renderElement(LoginPage),
    handle: { title: '登录' },
  },
  {
    path: '/',
    element: renderElement(AppLayout),
    handle: { title: '主页' },
    children: [
      {
        index: true,
        element: renderElement(HomePage),
      },
    ],
  },
]
