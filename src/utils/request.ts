import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
})

// 请求拦截：统一注入 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截：统一剥离 data 层，统一错误处理
request.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (err: unknown) => Promise.reject(err),
)

export type { AxiosRequestConfig }
export default request
