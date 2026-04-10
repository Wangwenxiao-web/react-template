import type { JSX } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Button, Form, Input } from 'antd'

import { useAuthStore } from '@/stores/auth'

type LoginFields = {
  username: string
  password: string
}

function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onFinish = async ({ username, password }: LoginFields) => {
    setLoading(true)
    setErrorMsg('')
    try {
      // mock 登录：固定账号密码
      if (username === 'admin' && password === '123456') {
        useAuthStore.getState().login('mock-token')
        const redirect = searchParams.get('redirect')
        navigate(redirect ?? '/', { replace: true })
      } else {
        setErrorMsg('用户名或密码错误')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-90 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">欢迎回来</h1>
          <p className="text-muted-foreground mt-1 text-sm">请输入账号信息登录</p>
        </div>

        {errorMsg && (
          <Alert
            title={errorMsg}
            type="error"
            showIcon
            closable={{ onClose: () => setErrorMsg('') }}
          />
        )}

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
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
