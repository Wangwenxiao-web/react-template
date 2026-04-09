import type { JSX } from 'react'

import { appConfig } from '@/config/app.config'

import BrandTitle from './components/BrandTitle'
import AntdMenu from './components/AntdMenu'
import CustomMenu from './components/CustomMenu'

const MENU_VIEW = {
  antd: AntdMenu,
  custom: CustomMenu,
}

function BaseSide(): JSX.Element {
  const MenuComponent = MENU_VIEW[appConfig.layout.sidebar.menu.implementation]

  return (
    <div className="bg-primary text-primary-foreground flex h-full flex-col">
      <div className="border-border/30 h-16 shrink-0 border-b">
        <BrandTitle />
      </div>
      <aside className="flex min-h-0 w-60 flex-1 flex-col">
        <MenuComponent />
      </aside>
    </div>
  )
}

export default BaseSide
