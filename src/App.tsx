import type { JSX } from 'react'

import { ConfigProvider } from 'antd'

import { useAntdTheme } from '@/hooks/useAntdTheme'

import BaseHeader from '@/layout/BaseHeader'
import BaseMain from '@/layout/BaseMain'
import BaseSide from '@/layout/BaseSide'

function App(): JSX.Element {
  const theme = useAntdTheme()

  return (
    <ConfigProvider theme={theme}>
      <div className="bg-background text-foreground min-h-screen">
        <div className="flex h-screen">
          <BaseSide />

          <div className="flex min-w-0 flex-1 flex-col">
            <BaseHeader />
            <BaseMain />
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
