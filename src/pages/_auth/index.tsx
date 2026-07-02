import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_auth/')({
  beforeLoad: async ({ location }) => {
    const { user } = useAuthStore.getState()

    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: Index,
})

function Index() {
  const authstore = useAuthStore()

  function handleLogout() {
    authstore.logout()
  }

  return (
    <div>
      <h1>index home</h1>
      <button onClick={handleLogout}>
        clear token
      </button>
      <Outlet />
    </div>
  )
}
