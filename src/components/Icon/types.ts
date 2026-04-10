import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

export type IconName = keyof typeof LucideIcons

export interface IconProps extends Omit<LucideProps, 'name'> {
  name: IconName | null // 图标名称，允许 null
  className?: string // 可选的 CSS 类名
  fallback?: React.ReactNode // 可选的备用内容
}
