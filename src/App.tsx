import { useState } from 'react'
import type { ComponentType } from 'react'
import AntdColorSystemView from '@/views/AntdColorSystemView'
import NativeColorSystemView from '@/views/NativeColorSystemView'

type ViewKey = 'native' | 'antd'

interface ViewDefinition {
  label: string
  component: ComponentType
}

const VIEW_REGISTRY = {
  native: {
    label: '原生使用',
    component: NativeColorSystemView,
  },
  antd: {
    label: 'Antd 使用',
    component: AntdColorSystemView,
  },
} as const satisfies Record<ViewKey, ViewDefinition>

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('native')
  const ActiveView = VIEW_REGISTRY[activeView].component

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="border-border bg-background/95 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex max-w-5xl gap-3 px-6 py-4">
          {(Object.entries(VIEW_REGISTRY) as [ViewKey, ViewDefinition][]).map(([viewKey, view]) => {
            const isActive = viewKey === activeView

            return (
              <div
                key={viewKey}
                onClick={() => setActiveView(viewKey)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border bg-card text-card-foreground hover:bg-muted'
                }`}
              >
                {view.label}
              </div>
            )
          })}
        </div>
      </div>

      <ActiveView />
    </div>
  )
}

export default App
