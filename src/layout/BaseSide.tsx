import type { JSX } from 'react'

import BrandTitle from './components/BrandTitle'
import Menu from './components/Menu'

function BaseSide(): JSX.Element {
  return (
    <div className="bg-sidebar text-primary-foreground flex h-full flex-col">
      <div className="border-border/30 h-16 shrink-0 border-b">
        <BrandTitle />
      </div>
      <aside className="flex min-h-0 w-60 flex-1 flex-col">
        <Menu />
      </aside>
    </div>
  )
}

export default BaseSide
