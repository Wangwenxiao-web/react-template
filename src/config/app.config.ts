import { MENU_IMPLEMENTATIONS, ICON_PROVIDERS } from '@/types'
import type { AppConfig, AppConfigJson, IconProvider, MenuImplementation } from '@/types'

import appConfigJson from './app.config.json'

const DEFAULT_APP_SHELL_CONFIG: AppConfig = {
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

function resolveRecord(value: unknown): Record<string, unknown> {
  return isPlainObject(value) ? value : {}
}

function isMenuImplementation(value: unknown): value is MenuImplementation {
  return typeof value === 'string' && MENU_IMPLEMENTATIONS.includes(value as MenuImplementation)
}

function isIconProvider(value: unknown): value is IconProvider {
  return typeof value === 'string' && ICON_PROVIDERS.includes(value as IconProvider)
}

function mergeAppConfig(source: AppConfigJson, defaults: AppConfig): AppConfig {
  return {
    layout: {
      sidebar: {
        menu: {
          implementation: isMenuImplementation(source.layout?.sidebar?.menu?.implementation)
            ? source.layout.sidebar.menu.implementation
            : defaults.layout.sidebar.menu.implementation,
        },
        icon: {
          provider: isIconProvider(source.layout?.sidebar?.icon?.provider)
            ? source.layout.sidebar.icon.provider
            : defaults.layout.sidebar.icon.provider,
        },
      },
    },
    features: { ...defaults.features, ...resolveRecord(source.features) },
    experimental: { ...defaults.experimental, ...resolveRecord(source.experimental) },
  }
}

export const appConfig = mergeAppConfig(appConfigJson, DEFAULT_APP_SHELL_CONFIG)
