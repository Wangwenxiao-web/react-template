import axios, {
  type AxiosResponse,
  type AxiosAdapter,
  type InternalAxiosRequestConfig,
} from 'axios'
import { matchMock } from '@/mock'
import { useAuthStore } from '@/stores/auth'
import { router } from '@/router'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

const mockAdapter: AxiosAdapter = async (
  config: InternalAxiosRequestConfig,
): Promise<AxiosResponse> => {
  const matched = matchMock(config)

  if (useMock && matched) {
    const data = matched.handler(config)

    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: {},
    }
  }

  const defaultAdapter = axios.getAdapter(axios.defaults.adapter)
  return defaultAdapter(config)
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  adapter: mockAdapter,
})

// 请求拦截：统一注入 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截：统一剥离 data 层，统一错误处理
request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    return Promise.reject(new Error(res.statusText || '请求失败'))
  },
  (err: unknown) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      useAuthStore.getState().logout()
      // 预留：useAuthStore.getState().showAuthModal()
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
      void router.navigate(`/login?redirect=${returnUrl}`, { replace: true })
    }
    return Promise.reject(err)
  },
)

export default request
