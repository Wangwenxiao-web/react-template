import type { JSX } from 'react'

import LayoutSection from '@/layout/BaseSection'

function BaseSide(): JSX.Element {
  return <LayoutSection className="w-64 shrink-0" title="这是侧边栏" description="后续这里放菜单" />
}

export default BaseSide
