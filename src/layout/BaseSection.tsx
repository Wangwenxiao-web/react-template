import type { JSX } from 'react'

interface LayoutSectionProps {
  className: string
  description: string
  title: string
}

function LayoutSection({ className, description, title }: LayoutSectionProps): JSX.Element {
  return (
    <div
      className={`border-border bg-card text-card-foreground flex items-center justify-center border p-6 ${className}`}
    >
      <div className="space-y-2 text-center">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
    </div>
  )
}

export default LayoutSection
