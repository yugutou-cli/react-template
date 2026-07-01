import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const router = useRouter()

  function handleAbout() {
    router.navigate({
      to: '/$id/about',
      params: { id: '0' },
    })
  }
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit
        {' '}
        <code>src/routes/index.tsx</code>
        {' '}
        to get started.
      </p>

      <button onClick={handleAbout}>about</button>
    </div>
  )
}
