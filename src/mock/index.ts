import type { AxiosRequestConfig } from 'axios'
import { authMock } from './modules/auth'
import { systemMock } from './modules/system'

const mockList: MockItem[] = [...authMock, ...systemMock]

function normalizeUrl(url: string) {
  return url.split('?')[0]
}

export interface MockItem<T = unknown> {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  handler: (config: AxiosRequestConfig) => WebApiResponse<T>
}

export function matchMock(config: AxiosRequestConfig) {
  const url = normalizeUrl(config.url || '')
  const method = (config.method || 'get').toLowerCase()

  return mockList.find((item) => item.url === url && item.method === method)
}
