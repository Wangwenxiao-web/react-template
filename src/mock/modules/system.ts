import type { AxiosRequestConfig } from 'axios'
import { mockMenu } from '@/constants'

export interface MockItem<T = unknown> {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  handler: (config: AxiosRequestConfig) => WebApiResponse<T>
}

export const systemMock: MockItem[] = [
  {
    url: '/api/system/menus',
    method: 'get',
    handler: () => ({
      code: 200,
      success: true,
      data: mockMenu,
      message: '菜单获取成功',
    }),
  },
]
