import { gql } from 'apollo-angular';
import { resultInfoFragment } from '../fragment/result-info.fragment';
import { userFragment } from '../fragment/user.fragment';

/* export const login = gql`
  query login($email: String!, $password: String!, $include: Boolean!) {
    login(email: $email, password: $password) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`; */

export const loginRestricted = gql`
  query loginRestricted(
    $email: String!
    $password: String!
    $include: Boolean!
  ) {
    loginRestricted(email: $email, password: $password) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const logout = gql`
  query {
    logout {
      status
      message
    }
  }
`;

export const renewToken = gql`
  query {
    renewToken {
      status
      message
      user {
        _id
        name
        lastname
        email
        role
      }
    }
  }
`;

export const getUsers = gql`
  query getUsers($include: Boolean!, $page: Int, $itemsPage: Int) {
    users(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      users {
        ...UserObject
      }
    }
  }
  ${userFragment}
  ${resultInfoFragment}
`;

export const getMe = gql`
  query {
    me {
      status
      message
      user {
        _id
        name
        lastname
        email
        role
      }
    }
  }
`;
