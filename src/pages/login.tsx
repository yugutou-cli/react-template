import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '#/stores/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const router = useRouter()
  const login = useAuthStore(s => s.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      router.navigate({ to: '/' })
    }
    catch (err) {
      setError((err as Error).message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
      {/* 背景装饰 */}
      <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-gradient-to-b from-gray-100 to-transparent opacity-60" />
      <div className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-gradient-to-t from-gray-100 to-transparent opacity-60" />

      <form onSubmit={handleSubmit} className="relative w-full max-w-sm space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">登录</h1>

        <div className="space-y-6">
          <div className="relative">
            <span className="iconify-[mdi--account-outline] absolute bottom-3 left-0 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border-b border-gray-300 pb-2 pl-8 text-lg outline-none transition-colors focus:border-gray-900"
            />
          </div>

          <div className="relative">
            <span className="iconify-[mdi--lock-outline] absolute bottom-3 left-0 size-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 pb-2 pl-8 pr-8 text-lg outline-none transition-colors focus:border-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-2 right-0 text-gray-400 transition-colors hover:text-gray-600"
            >
              <span className={`size-5 ${showPassword ? 'iconify-[mdi--eye-off]' : 'iconify-[mdi--eye]'}`} />
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? '登录中…' : '登录'}
        </button>
      </form>
    </div>
  )
}
