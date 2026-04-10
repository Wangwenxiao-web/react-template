import request from '@/lib/request'
import type { MenuItem } from '@/types'

export function fetchMenus(): Promise<WebApiResponse<MenuItem[]>> {
  return request.get<WebApiResponse<MenuItem[]>, WebApiResponse<MenuItem[]>>('/system/menus')
}
