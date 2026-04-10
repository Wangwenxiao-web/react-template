import React from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

export type IconName = keyof typeof LucideIcons

export interface IconProps extends Omit<LucideProps, 'name'> {
  name: IconName | null // 图标名称，允许 null
  className?: string // 可选的 CSS 类名
  fallback?: React.ReactNode // 可选的备用内容
}

function Icon({ name, ...rest }: IconProps): React.JSX.Element | null {
  const { className } = rest
  if (!name) return null
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps> | undefined
  if (!LucideIcon) return <>{rest.fallback ? rest.fallback : <LucideIcons.Circle />}</>
  return (
    <LucideIcon className={className} size={rest.size} strokeWidth={rest.strokeWidth} {...rest} />
  )
}

export { Icon }
