import type { JSX } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import useAntdTheme from '@/hooks/useAntdTheme'
import { router } from '@/router'

function App(): JSX.Element {
  const configProps = useAntdTheme()

  return (
    <ConfigProvider {...configProps}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
