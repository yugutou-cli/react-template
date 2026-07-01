import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'

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
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] rounded-2xl border border-white/[0.08] bg-[#141414] p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <img
            src="/yugutou_logo.png"
            alt="鱼骨"
            className="size-14 object-contain"
          />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#fafafa]">
            鱼骨
          </h1>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            欢迎回来
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <div className="relative">
            <span className="iconify-[mdi--account-outline] absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="h-11 w-full rounded-lg border border-white/10 bg-[#1a1a1a] py-2 pl-10 pr-3 text-[15px] text-[#fafafa] placeholder:text-[#a1a1aa] outline-none transition-colors focus:border-white/40"
            />
          </div>

          <div className="relative">
            <span className="iconify-[mdi--lock-outline] absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-white/10 bg-[#1a1a1a] py-2 pl-10 pr-10 text-[15px] text-[#fafafa] placeholder:text-[#a1a1aa] outline-none transition-colors focus:border-white/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
            >
              <span className={`size-5 ${showPassword ? 'iconify-[mdi--eye-off]' : 'iconify-[mdi--eye]'}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-[15px] font-medium text-[#0a0a0a] transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? '登录中…' : '登录'}
        </button>
      </form>
    </main>
  )
}
