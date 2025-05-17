import { infiniteQueryOptions, queryOptions, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";
import { QueryFunction, QueryFunctionContext } from "@tanstack/query-core";

export type PostType = {
  id: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
};

export type PostsResponse = {
  items: PostType[];
  nextPage?: number;
};

const WORDPRESS_API_URL = "http://localhost:8080/wp-json/wp/v2";

// On définit la QueryKey comme un tuple littéral, important pour TS
export type PostsQueryKey = ["posts"];

// Ici on précise bien que pageParam est un number, et que queryKey est PostsQueryKey
async function fetchPosts({
  pageParam = 1,
}) {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?page=${pageParam}&per_page=5`,
  );
  if (!res.ok) throw new Error("Erreur chargement posts");
  const data = await res.json()
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10) || 1

  return {
    items: data,
    nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
  }
}

export const postsQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  });

export const fetchPost = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`);
    const post = await axios
      .get<PostType>(`${WORDPRESS_API_URL}/posts/${data}`)
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });

    return post;
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => fetchPost({ data: postId }),
  });
