import request from '@/lib/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export function login(params: LoginParams): Promise<WebApiResponse<LoginResponse>> {
  return request.post<WebApiResponse<LoginResponse>, WebApiResponse<LoginResponse>>(
    '/auth/login',
    params,
  )
}
