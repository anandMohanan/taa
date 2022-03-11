import { gql } from "urql";

export const CREATE_POST = gql`
  mutation ($title: String!, $body: String!, $image: String) {
    createPost(title: $title, body: $body, image: $image) {
      id
      title
      body
      createdAt
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const DELETE_MUTATION = gql`
  mutation ($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_MUTATION = gql`
  mutation ($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
