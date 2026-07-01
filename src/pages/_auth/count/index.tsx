import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/count/')({
  component: Home,
})

function Home() {
  const state = Route.useLoaderData()

  function handleClick() {
    console.log('handleClick')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      Add 1 to
      {' '}
      {state}
      ?
    </button>
  )
}
