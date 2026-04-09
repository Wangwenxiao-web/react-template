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
    <div className="bg-primary text-primary-foreground">
      <div className="border-border/30 h-16 border-b">
        <BrandTitle />
      </div>
      <aside className="flex h-full w-60 shrink-0 flex-col">
        <MenuComponent />
      </aside>
    </div>
  )
}

export default BaseSide
