import type { JSX } from 'react'
import { RouterProvider } from 'react-router-dom'
import { App as AntdApp, ConfigProvider } from 'antd'
import useAntdTheme from '@/hooks/useAntdTheme'
import { router } from '@/router'

function App(): JSX.Element {
  const configProps = useAntdTheme()

  return (
    <ConfigProvider {...configProps}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
