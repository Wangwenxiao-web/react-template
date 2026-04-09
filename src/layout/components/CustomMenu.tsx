import { NavLink } from 'react-router-dom'
import {
  Calendar,
  Circle,
  FileText,
  Home,
  Info,
  type LucideIcon,
  MapPin,
  MessageSquare,
  Navigation,
  Settings,
} from 'lucide-react'

import { mockMenu } from '@/constants'
import { cn } from '@/lib/utils'

const ICON_MAP = {
  'fa-home': Home,
  'fa-cog': Settings,
  'fa-location-arrow': Navigation,
  'fa-calendar': Calendar,
  'fa-commenting': MessageSquare,
  'fa-file': FileText,
  'fa-info-circle': Info,
  'fa-map-marker': MapPin,
} as const satisfies Record<string, LucideIcon>

type IconKey = keyof typeof ICON_MAP

function resolveIcon(icon: string | null): LucideIcon {
  if (icon !== null && icon in ICON_MAP) {
    return ICON_MAP[icon as IconKey]
  }
  return Circle
}

const navItemClass = (isActive: boolean) =>
  cn(
    'flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors duration-150',
    isActive
      ? 'bg-sidebar-accent text-primary-foreground'
      : 'text-sidebar-muted-foreground hover:bg-sidebar-hover hover:text-primary-foreground',
  )

interface CustomMenuProps {
  collapsed?: boolean
}

export default function CustomMenu({ collapsed = false }: CustomMenuProps) {
  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
      {mockMenu.map((item) => {
        const Icon = resolveIcon(item.icon)
        const hasChildren = item.children.length > 0

        // 有子菜单：标题作为 group-label，子项直接展开
        if (hasChildren) {
          return (
            <div key={item.id} className="mt-3 first:mt-0">
              {!collapsed && (
                <div className="group-label mb-1 flex items-center gap-1.5">
                  <Icon className="h-3 w-3 opacity-60" />
                  <span>{item.menuName}</span>
                </div>
              )}
              <div className="space-y-0.5">
                {item.children.map((child) => (
                  <NavLink
                    key={child.id}
                    to={child.menuUrl}
                    title={collapsed ? child.menuName : undefined}
                    className={({ isActive }) => navItemClass(isActive)}
                  >
                    {/* div占位缩进 */}
                    <div className="h-3.5 w-3.5 shrink-0 opacity-40" />
                    {!collapsed && (
                      <span className="truncate text-sm font-medium">{child.menuName}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          )
        }

        // 无子菜单：直接作为 nav-item
        return (
          <NavLink
            key={item.id}
            to={item.menuUrl}
            title={collapsed ? item.menuName : undefined}
            className={({ isActive }) => navItemClass(isActive)}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate text-sm font-medium">{item.menuName}</span>}
          </NavLink>
        )
      })}
    </nav>
  )
}
