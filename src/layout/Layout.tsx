import type { JSX } from 'react'
import { ConfigProvider } from 'antd'

import useAntdTheme from '@/hooks/useAntdTheme'

import BaseHeader from '@/layout/BaseHeader'
import BaseMain from '@/layout/BaseMain'
import BaseSide from '@/layout/BaseSide'

function Layout(): JSX.Element {
  const configProps = useAntdTheme()

  return (
    <ConfigProvider {...configProps}>
      <div className="bg-background text-foreground flex h-screen">
        <BaseSide />

        <div className="flex min-w-0 flex-1 flex-col">
          <BaseHeader />
          <BaseMain />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Layout
