import {createFileRoute} from '@tanstack/react-router'
import {postsQueryOptions} from "~/features/posts/queries";

export const Route = createFileRoute('/')({
    loader: async ({context}) => {
        await context.queryClient.ensureQueryData(postsQueryOptions())
    },
    component: Home,
})

function Home() {
    return (
        <div className="py-8">
            <h3>Welcome Home!!!</h3>
        </div>
    )
}
