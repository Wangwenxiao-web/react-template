import { App } from 'antd'
import type { MessageArgsProps } from 'antd'

export type UseMessageOptions = MessageArgsProps

export type UseMessageReturn = Pick<
  ReturnType<typeof App.useApp>['message'],
  'open' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'destroy'
>

const useMessage = (): UseMessageReturn => {
  const { message } = App.useApp()
  return message
}

export default useMessage
