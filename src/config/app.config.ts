import appShellConfigJson from './app.config.json'

const MENU_IMPLEMENTATIONS = ['antd', 'custom'] as const
const ICON_PROVIDERS = ['font-awesome', 'lucide'] as const

export type MenuImplementation = (typeof MENU_IMPLEMENTATIONS)[number]
export type IconProvider = (typeof ICON_PROVIDERS)[number]

interface AppConfigJson {
  schemaVersion?: unknown
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
  schemaVersion: number
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

const DEFAULT_APP_SHELL_CONFIG = {
  schemaVersion: 1,
  layout: {
    sidebar: {
      menu: {
        implementation: 'custom',
      },
      icon: {
        provider: 'lucide',
      },
    },
  },
  features: {},
  experimental: {},
} as const satisfies AppConfig

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isMenuImplementation(value: unknown): value is MenuImplementation {
  return typeof value === 'string' && MENU_IMPLEMENTATIONS.includes(value as MenuImplementation)
}

function isIconProvider(value: unknown): value is IconProvider {
  return typeof value === 'string' && ICON_PROVIDERS.includes(value as IconProvider)
}

function resolveRecord(value: unknown): Record<string, unknown> {
  return isPlainObject(value) ? value : {}
}

function parseAppConfig(source: AppConfigJson): AppConfig {
  return {
    schemaVersion:
      typeof source.schemaVersion === 'number'
        ? source.schemaVersion
        : DEFAULT_APP_SHELL_CONFIG.schemaVersion,
    layout: {
      sidebar: {
        menu: {
          implementation: isMenuImplementation(source.layout?.sidebar?.menu?.implementation)
            ? source.layout.sidebar.menu.implementation
            : DEFAULT_APP_SHELL_CONFIG.layout.sidebar.menu.implementation,
        },
        icon: {
          provider: isIconProvider(source.layout?.sidebar?.icon?.provider)
            ? source.layout.sidebar.icon.provider
            : DEFAULT_APP_SHELL_CONFIG.layout.sidebar.icon.provider,
        },
      },
    },
    features: resolveRecord(source.features),
    experimental: resolveRecord(source.experimental),
  }
}

export const appConfig = parseAppConfig(appShellConfigJson)
