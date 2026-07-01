import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

function RootErrorComponent(...args: any[]) {
  return (
    <div>
      <h1>Root Error</h1>
      <p>Something went wrong at the root level.</p>
      {
        args.map((arg, index) => (
          <pre key={index}>{JSON.stringify(arg)}</pre>
        ))
      }
    </div>
  )
}
