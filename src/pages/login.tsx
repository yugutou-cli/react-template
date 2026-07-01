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
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">登录</h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border-b border-gray-300 pb-2 text-lg outline-none transition-colors focus:border-gray-900"
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 pb-2 text-lg outline-none transition-colors focus:border-gray-900"
          />
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
