import { ErrorComponent, Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQueryOptions } from '~/features/posts/queries'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '~/features/shared/components/NotFound'

export const Route = createFileRoute('/articles/$postId')({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(postId),
    )

    return {
      title: data.title.rendered,
      crumb: data.title.rendered,
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
  component: PostComponent,
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const { postId } = Route.useParams()
  const { data } = useSuspenseQuery(postQueryOptions(postId))
  const router = useRouter()
  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline" dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      <button className="btn btn-primary" onClick={() => router.history.back()}>Retour aux articles</button>
    </div>
  )
}
