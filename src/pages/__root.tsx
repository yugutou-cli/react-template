import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
})

function RootComponent() {
  const router = useRouter()

  return (
    <>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel router={router} />,
          },
        ]}
      />
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
