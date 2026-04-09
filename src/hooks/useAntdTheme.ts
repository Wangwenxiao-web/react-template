import type { ThemeConfig } from 'antd'

export type SemanticColorToken =
  | 'background'
  | 'foreground'
  | 'card'
  | 'card-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'border'
  | 'ring'
  | 'sidebar-hover'
  | 'success'
  | 'success-bg'
  | 'warning'
  | 'warning-bg'
  | 'danger'
  | 'danger-bg'
  | 'info'
  | 'info-bg'

function readCssColor(token: SemanticColorToken): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${token}`).trim()
}

export function useAntdTheme(): ThemeConfig {
  const background = readCssColor('background')
  const foreground = readCssColor('foreground')
  const card = readCssColor('card')
  const cardForeground = readCssColor('card-foreground')
  const primary = readCssColor('primary')
  const primaryForeground = readCssColor('primary-foreground')
  const muted = readCssColor('muted')
  const mutedForeground = readCssColor('muted-foreground')
  const border = readCssColor('border')
  const ring = readCssColor('ring')
  const sidebarHover = readCssColor('sidebar-hover')
  const success = readCssColor('success')
  const successBg = readCssColor('success-bg')
  const warning = readCssColor('warning')
  const warningBg = readCssColor('warning-bg')
  const danger = readCssColor('danger')
  const dangerBg = readCssColor('danger-bg')
  const info = readCssColor('info')
  const infoBg = readCssColor('info-bg')

  return {
    token: {
      colorPrimary: primary,
      colorSuccess: success,
      colorWarning: warning,
      colorError: danger,
      colorInfo: info,
      colorLink: primary,
      colorBgBase: background,
      colorBgLayout: background,
      colorBgContainer: card,
      colorText: foreground,
      colorTextBase: foreground,
      colorTextSecondary: mutedForeground,
      colorBorder: border,
      colorBorderSecondary: border,
      colorFillSecondary: muted,
      colorFillTertiary: muted,
      colorSuccessBg: successBg,
      colorWarningBg: warningBg,
      colorErrorBg: dangerBg,
      colorInfoBg: infoBg,
      colorTextLightSolid: primaryForeground,
      controlOutline: ring,
      fontFamily: 'var(--font-sans)',
      borderRadius: 12,
      boxShadow: 'none',
    },
    components: {
      Button: {
        defaultBorderColor: border,
        defaultColor: cardForeground,
        defaultBg: card,
        primaryShadow: 'none',
        dangerShadow: 'none',
      },
      Card: {
        colorBgContainer: card,
        colorTextHeading: foreground,
        colorTextDescription: mutedForeground,
      },
      Input: {
        activeBorderColor: primary,
        hoverBorderColor: primary,
        activeShadow: `0 0 0 1px ${primary}`,
      },
      Alert: {
        withDescriptionPadding: 16,
      },
      Menu: {
        darkPopupBg: primary,
        darkItemBg: primary,
        darkSubMenuItemBg: primary,
        darkItemHoverBg: sidebarHover,
      },
    },
  }
}
