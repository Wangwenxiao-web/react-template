type BadgeVariant = 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  variant: BadgeVariant
  label: string
}

interface ColorSwatchProps {
  token: string
  label: string
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

const BADGE_CLASSES = {
  success: 'bg-success-bg text-success-foreground',
  warning: 'bg-warning-bg text-warning-foreground',
  danger: 'bg-danger-bg text-danger-foreground',
  info: 'bg-info-bg text-info-foreground',
} as const satisfies Record<BadgeVariant, string>

function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${BADGE_CLASSES[variant]}`}>
      {label}
    </span>
  )
}

function ColorSwatch({ token, label }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="border-border h-8 w-8 rounded border"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-medium">{label}</span>
        <span className="text-muted-foreground font-mono text-xs">--color-{token}</span>
      </div>
    </div>
  )
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-border text-foreground border-b pb-2 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

export default function NativeColorSystemView() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 px-6 py-12">
      <header className="space-y-1">
        <h1 className="text-foreground text-2xl font-bold">原生颜色系统示例</h1>
        <p className="text-muted-foreground text-sm">
          演示三种使用颜色 token 的方式：Tailwind class、CSS 变量、arbitrary value
        </p>
      </header>

      <Section title="基础色（方式一：Tailwind utility class）">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm">
            bg-primary
          </div>
          <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 text-sm">
            bg-secondary
          </div>
          <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 text-sm">
            bg-muted
          </div>
          <div className="bg-accent text-accent-foreground rounded-lg px-4 py-3 text-sm">
            bg-accent
          </div>
        </div>
      </Section>

      <Section title="功能色（方式一：Tailwind utility class）">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" label="成功" />
          <Badge variant="warning" label="警告" />
          <Badge variant="danger" label="危险" />
          <Badge variant="info" label="信息" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-success-bg text-success-foreground rounded-lg px-4 py-3 text-sm">
            bg-success-bg
          </div>
          <div className="bg-warning-bg text-warning-foreground rounded-lg px-4 py-3 text-sm">
            bg-warning-bg
          </div>
          <div className="bg-danger-bg text-danger-foreground rounded-lg px-4 py-3 text-sm">
            bg-danger-bg
          </div>
          <div className="bg-info-bg text-info-foreground rounded-lg px-4 py-3 text-sm">
            bg-info-bg
          </div>
        </div>
      </Section>

      <Section title="侧边栏色（方式二：CSS 变量 via style prop）">
        <div
          className="flex flex-col gap-2 rounded-lg px-4 py-4"
          style={{ backgroundColor: 'var(--color-sidebar)' }}
        >
          <span
            style={{ color: 'var(--color-sidebar-foreground)' }}
            className="text-sm font-medium"
          >
            sidebar-foreground
          </span>
          <span style={{ color: 'var(--color-sidebar-muted-foreground)' }} className="text-xs">
            sidebar-muted-foreground
          </span>
        </div>
      </Section>

      <Section title="色板速查（方式二：CSS 变量 via style prop）">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ColorSwatch token="background" label="Background" />
          <ColorSwatch token="foreground" label="Foreground" />
          <ColorSwatch token="primary" label="Primary" />
          <ColorSwatch token="secondary" label="Secondary" />
          <ColorSwatch token="muted" label="Muted" />
          <ColorSwatch token="border" label="Border" />
          <ColorSwatch token="success" label="Success" />
          <ColorSwatch token="warning" label="Warning" />
          <ColorSwatch token="danger" label="Danger" />
          <ColorSwatch token="info" label="Info" />
        </div>
      </Section>

      <Section title="一次性颜色（方式三：Tailwind arbitrary value）">
        <p className="text-muted-foreground text-sm">
          适合不需要进入 token 系统的临时色值，直接在 className 中写 CSS 变量名：
        </p>
        <p className="text-sm">
          用{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs text-[var(--color-danger)]">
            text-[var(--color-danger)]
          </code>{' '}
          直接引用 CSS 变量。
        </p>
        <div className="rounded-lg bg-[hsl(217_91%_95%)] px-4 py-3 text-sm text-[hsl(217_91%_38%)]">
          bg-[hsl(217_91%_95%)] - arbitrary HSL 值（info-bg 的等效写法）
        </div>
      </Section>

      <Section title="边框与卡片">
        <div className="border-border bg-card text-card-foreground rounded-lg border px-5 py-4 shadow-sm">
          <p className="text-sm font-medium">Card 示例</p>
          <p className="text-muted-foreground mt-1 text-xs">
            bg-card / text-card-foreground / border-border
          </p>
        </div>
      </Section>
    </div>
  )
}
