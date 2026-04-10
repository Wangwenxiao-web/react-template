// 路由配置入口
// 路由守卫请单独放 guards.ts
import { lazy, createElement, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'

const AppLayout = lazy(() => import('@/App'))
const LoginPage = lazy(() => import('@/views/Auth/Login'))
const HomePage = lazy(() => import('@/views/Home/Home'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: createElement(Suspense, null, createElement(LoginPage)),
    handle: { title: '登录' },
  },
  {
    path: '/',
    element: createElement(Suspense, null, createElement(AppLayout)),
    handle: { title: '主页' },
    children: [
      {
        index: true,
        element: createElement(Suspense, null, createElement(HomePage)),
      },
    ],
  },
]
