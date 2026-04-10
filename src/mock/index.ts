import type { AxiosRequestConfig } from 'axios'
import { systemMock, type MockItem } from './modules/system'

const mockList: MockItem[] = [...systemMock]

function normalizeUrl(url: string) {
  return url.split('?')[0]
}

export function matchMock(config: AxiosRequestConfig) {
  const url = normalizeUrl(config.url || '')
  const method = (config.method || 'get').toLowerCase()

  return mockList.find((item) => item.url === url && item.method === method)
}
