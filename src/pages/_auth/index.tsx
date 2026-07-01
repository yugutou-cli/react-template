import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_auth/')({
  beforeLoad: async ({ location }) => {
    const { user } = useAuthStore.getState()
    if (!user) {
      throw redirect({ to: '/', search: { redirect: location.href } })
    }
  },
  component: () => {
    return (
      <div>
        index home
        <Outlet />
      </div>
    )
  },
})
