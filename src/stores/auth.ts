import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: { username: string } | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      login: async (username, password) => {
        await new Promise(r => setTimeout(r, 300))
        if (username === 'admin' && password === 'admin123') {
          set({ user: { username } })
        }
        else {
          throw new Error('用户名或密码错误')
        }
      },
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' },
  ),
)
