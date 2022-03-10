import Link from "next/link";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { LIKE_MUTATION } from "../graphql/mutations";

export const Like = ({ user, post }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && post.likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post.likes]);

  const [likePostData, likePostAction] = useMutation(LIKE_MUTATION);
  const variables = {
    postId: post.id,
  };

  const handleChange = (e) => {
    e.preventDefault();
    likePostAction(variables).then((result) => {
      if (result.error) {
        console.log(result.error);
      }
    });
  };

  const state = user ? (
    liked ? (
      <button onClick={handleChange} className="text-text-secondary">
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
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          />
        </svg>
        {post.likeCount}
      </button>
    ) : (
      <button onClick={handleChange} className="text-text-secondary">
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
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
        {post.likeCount}
      </button>
    )
  ) : (
    <Link href="./login">
      <a className="text-text-secondary">
        {" "}
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
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
      </a>
    </Link>
  );
  return (
    // <button className="text-text-secondary p-3">
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="h-6 w-6"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     stroke="currentColor"
    //     strokeWidth={2}
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M7 11l5-5m0 0l5 5m-5-5v12"
    //     />
    //   </svg>
    //   {post.likeCount}
    // </button>
    state
  );
};
