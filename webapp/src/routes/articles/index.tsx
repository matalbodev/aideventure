import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { postsQueryOptions } from "~/features/posts/queries";
import PostsList from "~/features/posts/components/PostsList";

export const Route = createFileRoute("/articles/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(postsQueryOptions());

  if (status === "error") return <p>Erreur de chargement</p>;
  const posts = data?.pages.map((page) => (page.items)).flat() || [];
  return (
    <div className="xl:px-[10rem]">
      <div className="flex flex-col gap-4 mb-8 bg-primary text-primary-content p-8 rounded-box">
        <h1 className="text-2xl font-bold">Découvrez nos articles</h1>
        <p>Nos articles sur l&#39;IA au service des développeurs</p>
      </div>
      <PostsList posts={posts} />
      <div className="text-center py-8">
        {hasNextPage && (
          <button
            className="btn btn-secondary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
