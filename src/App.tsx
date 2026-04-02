/**
 * 颜色系统使用示例
 *
 * 共三种使用方式：
 *
 * 1. Tailwind utility class（推荐）
 *    bg-primary / text-primary-foreground / border-border ...
 *    命名规则：bg-{token} / text-{token} / border-{token}
 *    token 名称来自 global.css 的 @theme inline 映射，与 tokens.css 中的 --color-* 一一对应。
 *
 * 2. CSS 变量（适合需要动态拼接或 CSS-in-JS 场景）
 *    直接使用 `var(--color-*)` 写在 style prop 或 className 的 arbitrary value 里。
 *    示例：style={{ color: 'var(--color-danger)' }}
 *         className="text-[var(--color-warning)]"
 *
 * 3. Tailwind arbitrary value（适合一次性用法，不希望扩展 token）
 *    className="bg-[hsl(0_0%_100%)]"  ← 直接写 HSL 值（空格用下划线）
 */

// ─── 类型定义 ────────────────────────────────────────────────────────────────

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  variant: BadgeVariant
  label: string
}

// 用 const object + as const 替代 enum，符合 TypeScript-Pro 规范
const BADGE_CLASSES = {
  success: 'bg-success-bg text-success-foreground',
  warning: 'bg-warning-bg text-warning-foreground',
  danger: 'bg-danger-bg text-danger-foreground',
  info: 'bg-info-bg text-info-foreground',
} as const satisfies Record<BadgeVariant, string>

// ─── 组件 ────────────────────────────────────────────────────────────────────

function Badge({ variant, label }: BadgeProps) {
  return (
    // 方式一：Tailwind utility class
    <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${BADGE_CLASSES[variant]}`}>
      {label}
    </span>
  )
}

function ColorSwatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {/* 方式二：CSS 变量 via arbitrary value */}
      <div
        className="border-border h-8 w-8 rounded border"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-medium">{label}</span>
        {/* 方式三：直接写 CSS 变量名用于展示 */}
        <span className="text-muted-foreground font-mono text-xs">--color-{token}</span>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      {/* 方式一：Tailwind utility class — text-foreground / border-border */}
      <h2 className="border-border text-foreground border-b pb-2 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

// ─── 页面 ────────────────────────────────────────────────────────────────────

function App() {
  return (
    // bg-background / text-foreground — 来自 @theme inline 映射
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-2xl space-y-10 px-6 py-12">
        <header className="space-y-1">
          <h1 className="text-foreground text-2xl font-bold">颜色系统示例</h1>
          <p className="text-muted-foreground text-sm">
            演示三种使用颜色 token 的方式：Tailwind class、CSS 变量、arbitrary value
          </p>
        </header>

        {/* ── 1. 基础色 ──────────────────────────────────────────────────── */}
        <Section title="基础色（方式一：Tailwind utility class）">
          <div className="grid grid-cols-2 gap-3">
            {/* bg-primary text-primary-foreground */}
            <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm">
              bg-primary
            </div>
            {/* bg-secondary text-secondary-foreground */}
            <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 text-sm">
              bg-secondary
            </div>
            {/* bg-muted text-muted-foreground */}
            <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 text-sm">
              bg-muted
            </div>
            {/* bg-accent text-accent-foreground */}
            <div className="bg-accent text-accent-foreground rounded-lg px-4 py-3 text-sm">
              bg-accent
            </div>
          </div>
        </Section>

        {/* ── 2. 功能色 Badge ─────────────────────────────────────────────── */}
        <Section title="功能色（方式一：Tailwind utility class）">
          <div className="flex flex-wrap gap-3">
            <Badge variant="success" label="成功" />
            <Badge variant="warning" label="警告" />
            <Badge variant="danger" label="危险" />
            <Badge variant="info" label="信息" />
          </div>
          {/* 功能色背景卡片示例 */}
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

        {/* ── 3. 侧边栏色 ─────────────────────────────────────────────────── */}
        <Section title="侧边栏色（方式二：CSS 变量 via style prop）">
          {/*
           * 方式二：style={{ backgroundColor: 'var(--color-sidebar)' }}
           * 适合动态拼接 token 名称，或在 CSS-in-JS 场景下使用
           */}
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

        {/* ── 4. 色板速查（方式二 + 方式一混用）──────────────────────────── */}
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

        {/* ── 5. Arbitrary value ───────────────────────────────────────────── */}
        <Section title="一次性颜色（方式三：Tailwind arbitrary value）">
          <p className="text-muted-foreground text-sm">
            适合不需要进入 token 系统的临时色值，直接在 className 中写 CSS 变量名：
          </p>
          {/* text-[var(--color-danger)] — arbitrary value 引用 CSS 变量 */}
          <p className="text-sm">
            用{' '}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs text-[var(--color-danger)]">
              text-[var(--color-danger)]
            </code>{' '}
            直接引用 CSS 变量。
          </p>
          {/* bg-[hsl(...)] — arbitrary value 直接写 HSL（空格用下划线） */}
          <div className="rounded-lg bg-[hsl(217_91%_95%)] px-4 py-3 text-sm text-[hsl(217_91%_38%)]">
            bg-[hsl(217_91%_95%)] — arbitrary HSL 值（info-bg 的等效写法）
          </div>
        </Section>

        {/* ── 边框 / 卡片示例 ──────────────────────────────────────────────── */}
        <Section title="边框与卡片">
          {/* border-border bg-card text-card-foreground — 方式一 */}
          <div className="border-border bg-card text-card-foreground rounded-lg border px-5 py-4 shadow-sm">
            <p className="text-sm font-medium">Card 示例</p>
            <p className="text-muted-foreground mt-1 text-xs">
              bg-card / text-card-foreground / border-border
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default App
