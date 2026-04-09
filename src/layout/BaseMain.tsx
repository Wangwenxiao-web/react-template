import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'

function BaseMain(): JSX.Element {
  return (
    <div className="border-border bg-card text-card-foreground min-h-0 flex-1 border p-4">
      <Outlet />
    </div>
  )
}

export default BaseMain
