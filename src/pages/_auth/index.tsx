import { createFileRoute, redirect } from '@tanstack/react-router'

function isAuthenticated() {
  return true
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_auth/')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
})
