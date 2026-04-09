import * as React from 'react'
import type { JSX } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Menu } from 'antd'
import type { MenuProps } from 'antd'

import { mockMenu } from '@/constants'
import type { MenuItem } from '@/types'

import { renderMenuIcon } from './IconRegistry'

function AntdMenu(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuList, setMenuList] = React.useState<MenuItem[]>([])

  React.useEffect(() => {
    // 模拟获取菜单数据
    setMenuList(mockMenu)
  }, [])

  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('Menu item clicked:', e)
    navigate(e.key)
  }

  // 转换为 AntD Menu 支持的结构
  const renderMenuItems = (menus: MenuItem[]): MenuProps['items'] => {
    return menus.map((menu) => {
      if (menu.type === 1 && menu.children?.length) {
        return {
          key: menu.menuUrl,
          label: menu.menuName,
          icon: renderMenuIcon(menu.icon, { className: 'h-3.5 w-3.5' }),
          children: renderMenuItems(menu.children),
        }
      }
      return {
        key: menu.menuUrl,
        label: menu.menuName,
        icon: renderMenuIcon(menu.icon, { className: 'h-3.5 w-3.5' }),
      }
    })
  }

  return (
    <div className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={renderMenuItems(menuList)}
        onClick={onMenuClick}
      />
    </div>
  )
}

export default AntdMenu
