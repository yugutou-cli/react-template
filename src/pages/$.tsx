import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Not Found 404</div>
}
