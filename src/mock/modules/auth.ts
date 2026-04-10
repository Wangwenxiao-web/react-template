import type { MockItem } from '@/mock'

type LoginRequest = {
  username: string
  password: string
}

export const authMock: MockItem[] = [
  {
    url: '/auth/login',
    method: 'post',
    handler: (config) => {
      const requestData =
        typeof config.data === 'string'
          ? (JSON.parse(config.data) as LoginRequest)
          : ((config.data ?? {}) as Partial<LoginRequest>)

      if (requestData.username === 'admin' && requestData.password === '123456') {
        return {
          code: 200,
          success: true,
          data: { token: 'mock-token' },
          message: '登录成功',
        }
      }

      return {
        code: 401,
        success: false,
        data: { token: '' },
        message: '账号或密码错误',
      }
    },
  },
]
