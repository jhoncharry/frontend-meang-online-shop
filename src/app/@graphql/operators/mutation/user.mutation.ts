import { gql } from 'apollo-angular';
import { userFragment } from '../fragment/user.fragment';

export const registerUser = gql`
  mutation registerUser($user: UserCreateInput!, $include: Boolean!) {
    register(userInput: $user) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const updateUser = gql`
  mutation updateUser($user: UserUpdateInput!, $include: Boolean!) {
    updateUser(userInput: $user) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const deleteUser = gql`
  mutation deleteUser($_id: ID!, $include: Boolean!) {
    deleteUser(_id: $_id) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;
