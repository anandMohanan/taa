import { gql } from "urql";

export const POST_QUERY = gql`
  query {
    getPosts {
      username
      title
      body
      id
      likes {
        username
      }
      likeCount

      createdAt
    }
  }
`;

export const POST_BY_ID_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      username
      title
      body
      id
      likes {
        username
      }
      likeCount

      createdAt
      image
    }
  }
`;
