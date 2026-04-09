export const MENU_IMPLEMENTATIONS = ['antd', 'custom'] as const
export const ICON_PROVIDERS = ['font-awesome', 'lucide'] as const

export type MenuImplementation = (typeof MENU_IMPLEMENTATIONS)[number]
export type IconProvider = (typeof ICON_PROVIDERS)[number]

export interface AppConfigJson {
  layout?: {
    sidebar?: {
      menu?: {
        implementation?: unknown
      }
      icon?: {
        provider?: unknown
      }
    }
  }
  features?: Record<string, unknown>
  experimental?: Record<string, unknown>
}

export interface AppConfig {
  layout: {
    sidebar: {
      menu: {
        implementation: MenuImplementation
      }
      icon: {
        provider: IconProvider
      }
    }
  }
  features: Record<string, unknown>
  experimental: Record<string, unknown>
}
