import type { JSX } from 'react'

import BrandTitle from './components/BrandTitle'
import CustomMenu from '@/layout/components/CustomMenu'

function BaseSide(): JSX.Element {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="border-border/30 h-16 border-b">
        <BrandTitle />
      </div>
      <aside className="flex h-full w-60 shrink-0 flex-col">
        <CustomMenu />
      </aside>
    </div>
  )
}

export default BaseSide
