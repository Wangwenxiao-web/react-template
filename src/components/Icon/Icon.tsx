import React from 'react'

import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

import type { IconProps } from './types'

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
