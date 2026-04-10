import { create } from 'zustand'

type AuthState = {
  token: string | null
  // 预留：authModalVisible: boolean
}

type AuthActions = {
  login: (token: string) => void
  logout: () => void
  // 预留：showAuthModal: () => void
  // 预留：hideAuthModal: () => void
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: localStorage.getItem('token'),

  login: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null })
  },
}))
