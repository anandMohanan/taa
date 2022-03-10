import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation } from "urql";
import { AuthContext } from "../context/authentication";
import { DELETE_MUTATION } from "../graphql/mutations";
import { Like } from "./like";

export const Posts = ({ post }) => {
  const [deletePostResult, deletePostAction] = useMutation(DELETE_MUTATION);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  console.log(post.username);
  const variables = {
    postId: post.id,
  };
  const handleClick = () => {
    deletePostAction(variables).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log(result);
        router.reload(window.location.pathname);
      }
    });
  };
  return (
    <div className="py-6">
      <div className="flex  justify-between p-4 overflow-hidden">
        <div className="w-2/3 p-1">
          <Link href={`/post/${post.id}`}>
            <a className="text-text font-bold text-2xl">{post.title}</a>
          </Link>
          <p className="mt-2 text-text-secondary font-bold text-sm">
            By {post.username}
          </p>
        </div>
        <div>
          <Like user={user} post={post} />

          {user && user.username === post.username && (
            <button
              onClick={handleClick}
              className="ml-5 text-right text-text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
