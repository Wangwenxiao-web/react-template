import type { JSX } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import useMessage from '@/hooks/useMessage'
import { useAuthStore } from '@/stores/auth'

type LoginFields = {
  username: string
  password: string
}

function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const message = useMessage()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const onFinish = async ({ username, password }: LoginFields) => {
    setLoading(true)
    try {
      // mock 登录：固定账号密码
      if (username === 'admin' && password === '123456') {
        message.success('登录成功')
        useAuthStore.getState().login('mock-token')
        const redirect = searchParams.get('redirect')
        navigate(redirect ?? '/', { replace: true })
      } else {
        message.error('用户名或密码错误')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* 左侧品牌区 */}
      <div className="bg-primary text-primary-foreground hidden w-105 shrink-0 flex-col justify-between px-12 py-14 lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(240 5.9% 10%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div>
            <div className="text-sm leading-tight font-semibold">管理系统</div>
            <div className="mt-0.5 text-[11px] leading-tight text-[hsl(240_5%_55%)]">
              Admin Console
            </div>
          </div>
        </div>

        {/* <!-- 中间文案 --> */}
        <div>
          <h1 className="mb-3 text-2xl leading-snug font-semibold">
            统一管理，
            <br />
            高效运营
          </h1>
          <p className="text-sm leading-relaxed text-[hsl(240_5%_55%)]">
            集数据分析、用户管理、内容运营于一体的后台管理平台，让您的业务尽在掌握。
          </p>

          {/* <!-- 小功能点 --> */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[hsl(240_3.7%_18%)]">
                <i data-lucide="bar-chart-2" className="h-4 w-4 text-[hsl(240_5%_64.9%)]"></i>
              </div>
              <span className="text-sm text-[hsl(240_5%_60%)]">实时数据分析与可视化</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[hsl(240_3.7%_18%)]">
                <i data-lucide="users" className="h-4 w-4 text-[hsl(240_5%_64.9%)]"></i>
              </div>
              <span className="text-sm text-[hsl(240_5%_60%)]">精细化用户权限管理</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[hsl(240_3.7%_18%)]">
                <i data-lucide="shield" className="h-4 w-4 text-[hsl(240_5%_64.9%)]"></i>
              </div>
              <span className="text-sm text-[hsl(240_5%_60%)]">企业级安全与合规</span>
            </div>
          </div>
        </div>

        {/* <!-- 底部 --> */}
        <div className="text-[11px] text-[hsl(240_5%_40%)]">v2.4.1 &copy; 2026 管理系统</div>
      </div>
      {/* 右侧登录区 */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-90">
          {/* 移动端 Logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#18181b]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-primary text-sm font-semibold">管理系统</span>
          </div>

          <div className="mb-4">
            <h2 className="text-primary text-xl font-semibold">欢迎回来</h2>
            <p className="text-secondary mt-1 text-sm">请登录您的管理员账号</p>
          </div>

          {/* 表单 */}
          <Form<LoginFields> layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" autoComplete="current-password" />
            </Form.Item>

            <Form.Item>
              <Button className="mt-4" type="primary" htmlType="submit" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
