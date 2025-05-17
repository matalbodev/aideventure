import { PostType } from "~/features/posts/queries";
import { Link } from "@tanstack/react-router";
import { CalendarOutlined } from "@ant-design/icons";

interface PostsListProps {
  posts: PostType[];
}

export default function PostsList(props: PostsListProps) {
  const sortedPosts = [...props.posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <div className="flex flex-col gap-8">
      {sortedPosts.map((post) => {
        return (
          <div
            key={post.id}
            className="flex flex-col items-start gap-4 md:flex-row md:flex md:gap-8 justify-between md:items-center border-b border-neutral pb-4"
          >
            <div>
              <h2 className="card-title text-secondary">
                <Link
                  to={`/articles/$postId`}
                  params={{ postId: post.id }}
                  className="text-secondary hover:underline"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

              </h2>
              <p className="text-sm text-content flex items-center gap-2 mt-2">
                <CalendarOutlined />
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Link
              to={`/articles/$postId`}
              params={{ postId: post.id }}
              className={"btn btn-secondary"}
            >
              Lire l'article
            </Link>
          </div>
        );
      })}
    </div>
  );
}
