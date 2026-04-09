import type { JSX } from 'react'
import {
  Calendar,
  Circle,
  FileText,
  Home,
  Info,
  MapPin,
  MessageSquare,
  Navigation,
  Settings,
  type LucideIcon,
} from 'lucide-react'

import { appShellConfig } from '@/config/app.config'
import type { IconProvider } from '@/config/app.config'
import { cn } from '@/lib/utils'

const LUCIDE_ICON_MAP = {
  'fa-calendar': Calendar,
  'fa-cog': Settings,
  'fa-commenting': MessageSquare,
  'fa-file': FileText,
  'fa-home': Home,
  'fa-info-circle': Info,
  'fa-location-arrow': Navigation,
  'fa-map-marker': MapPin,
} as const satisfies Record<string, LucideIcon>

type LucideIconName = keyof typeof LUCIDE_ICON_MAP

type IconClassName = {
  className?: string
}

function isLucideIconName(icon: string): icon is LucideIconName {
  return icon in LUCIDE_ICON_MAP
}

function resolveLucideIcon(icon: string | null): LucideIcon {
  if (icon !== null && isLucideIconName(icon)) {
    return LUCIDE_ICON_MAP[icon]
  }

  return Circle
}

function renderFontAwesomeIcon(icon: string | null, options: IconClassName): JSX.Element | null {
  if (icon === null) {
    return null
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center', options.className)}
      aria-hidden="true"
    >
      <i className={`fa ${icon}`}></i>
    </span>
  )
}

function renderLucideIcon(icon: string | null, options: IconClassName): JSX.Element | null {
  if (icon === null) {
    return null
  }

  const Icon = resolveLucideIcon(icon)
  return <Icon className={options.className} aria-hidden="true" />
}

export function renderMenuIcon(
  icon: string | null,
  options: IconClassName = {},
  provider: IconProvider = appShellConfig.layout.sidebar.icon.provider,
): JSX.Element | null {
  if (provider === 'font-awesome') {
    return renderFontAwesomeIcon(icon, options)
  }

  return renderLucideIcon(icon, options)
}
