import { Suspense } from 'react'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import PageLoading from '@/components/PageLoading'

function BaseMain(): JSX.Element {
  return (
    <div className="border-border bg-card text-card-foreground min-h-0 flex-1 overflow-y-auto border p-4">
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default BaseMain
