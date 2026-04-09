import type { JSX } from 'react'

import CustomMenu from '@/layout/components/CustomMenu'

function BaseSide(): JSX.Element {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-[hsl(240,5.9%,10%)] text-[hsl(0,0%,98%)]">
      <CustomMenu />
    </aside>
  )
}

export default BaseSide
