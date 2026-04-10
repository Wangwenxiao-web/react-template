import type { MockItem } from '@/mock'
import { mockMenu } from '@/mock/data/system'

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
