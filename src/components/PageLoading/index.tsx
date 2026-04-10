import type { JSX } from 'react'
import { Spin } from 'antd'

type PageLoadingProps = {
  fullPage?: boolean
}

function PageLoading({ fullPage = false }: PageLoadingProps): JSX.Element {
  if (fullPage) {
    return (
      <div className="bg-background flex h-screen w-screen items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }
  return (
    <div className="bg-background flex h-full min-h-50 items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

export default PageLoading
