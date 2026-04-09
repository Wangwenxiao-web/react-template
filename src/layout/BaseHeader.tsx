import type { JSX } from 'react'

import LayoutSection from '@/layout/components/BaseSection'

function BaseHeader(): JSX.Element {
  return (
    <LayoutSection
      className="min-h-20"
      title="这是顶栏"
      description="后续这里放面包屑、用户信息等内容"
    />
  )
}

export default BaseHeader
