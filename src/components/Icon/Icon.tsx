import React from 'react'

import { Circle } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'

import type { IconProps } from './types'

function Icon({ name, ...rest }: IconProps): React.JSX.Element | null {
  if (!name) return null
  const { fallback, className, size, strokeWidth, ...iconProps } = rest

  return (
    <DynamicIcon
      name={name}
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      fallback={() =>
        fallback ? (
          <>{fallback}</>
        ) : (
          <Circle className={className} size={size} strokeWidth={strokeWidth} />
        )
      }
      {...iconProps}
    />
  )
}

export { Icon }
