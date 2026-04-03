import { Alert, Button, Card, ConfigProvider, Input, Space, Tag, Typography } from 'antd'
import { useAntdTheme, type SemanticColorToken } from '@/hooks/index'

interface MappingRowProps {
  semanticToken: SemanticColorToken
  antdToken: string
}

const ANTD_TOKEN_MAPPING = [
  ['primary', 'colorPrimary'],
  ['background', 'colorBgLayout'],
  ['card', 'colorBgContainer'],
  ['foreground', 'colorText'],
  ['muted-foreground', 'colorTextSecondary'],
  ['border', 'colorBorder'],
  ['success', 'colorSuccess'],
  ['warning', 'colorWarning'],
  ['danger', 'colorError'],
  ['info', 'colorInfo'],
] as const satisfies readonly [SemanticColorToken, string][]

function MappingRow({ semanticToken, antdToken }: MappingRowProps) {
  return (
    <div className="border-border bg-card flex items-center justify-between rounded-xl border px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: `var(--color-${semanticToken})` }}
        />
        <code className="text-foreground text-sm">--color-{semanticToken}</code>
      </div>
      <code className="text-muted-foreground text-sm">{antdToken}</code>
    </div>
  )
}

export default function AntdColorSystemView() {
  const theme = useAntdTheme()

  return (
    <ConfigProvider theme={theme}>
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-12">
        <header className="space-y-2">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Ant Design 颜色系统接入示例
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            这里没有单独维护 antd 主题色，而是把现有 CSS 变量解析后映射进 ConfigProvider。
          </Typography.Paragraph>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card title="真实组件效果" variant="outlined">
            <Space direction="vertical" size={16} style={{ display: 'flex' }}>
              <Typography.Text>
                下面这些组件直接消费同一套颜色语义：主色、背景、边框、文本、功能色。
              </Typography.Text>
              <Space wrap>
                <Button type="primary">Primary Action</Button>
                <Button>Default Action</Button>
                <Button color="danger" variant="solid">
                  Danger Action
                </Button>
              </Space>
              <Input placeholder="Input 边框、文本、聚焦色都来自当前颜色系统" />
              <Space wrap>
                <Tag color="success">Success</Tag>
                <Tag color="warning">Warning</Tag>
                <Tag color="error">Error</Tag>
                <Tag color="processing">Info</Tag>
              </Space>
              <Alert
                showIcon
                type="info"
                message="Info Alert"
                description="浅背景和语义色都来自样式 tokens 分层，而不是在 antd 内重复定义。"
              />
            </Space>
          </Card>

          <Card title="接入原则" variant="outlined">
            <Space direction="vertical" size={12} style={{ display: 'flex' }}>
              <Typography.Text strong>1. CSS 变量是唯一颜色源</Typography.Text>
              <Typography.Text type="secondary">
                antd 只消费你的 token，不再反向定义品牌色。
              </Typography.Text>
              <Typography.Text strong>2. 先做全局 token 映射</Typography.Text>
              <Typography.Text type="secondary">
                优先统一 `colorPrimary`、`colorBgContainer`、`colorText`、`colorBorder`。
              </Typography.Text>
              <Typography.Text strong>3. 组件 token 只做少量修正</Typography.Text>
              <Typography.Text type="secondary">
                只在全局映射不足时，针对 Button、Input、Card 做最小覆盖。
              </Typography.Text>
            </Space>
          </Card>
        </div>

        <Card title="语义 token -> antd token 映射" variant="outlined">
          <div className="grid gap-3 md:grid-cols-2">
            {ANTD_TOKEN_MAPPING.map(([semanticToken, antdToken]) => (
              <MappingRow key={antdToken} semanticToken={semanticToken} antdToken={antdToken} />
            ))}
          </div>
        </Card>
      </div>
    </ConfigProvider>
  )
}
