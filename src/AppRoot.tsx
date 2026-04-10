import type { JSX } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ConfigProvider } from 'antd'

import useAntdTheme from '@/hooks/useAntdTheme'
import { routes } from '@/router'

const router = createBrowserRouter(routes)

function AppRoot(): JSX.Element {
  const configProps = useAntdTheme()

  return (
    <ConfigProvider {...configProps}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default AppRoot
