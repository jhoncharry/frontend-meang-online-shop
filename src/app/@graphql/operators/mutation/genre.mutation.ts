import { gql } from 'apollo-angular';

export const addGenre = gql`
  mutation addGenre($name: String!) {
    addGenre(name: $name) {
      status
      message
      genre {
        id
        name
        slug
      }
    }
  }
`;

export const updateGenre = gql`
  mutation updateGenre($id: ID!, $name: String!) {
    updateGenre(id: $id, name: $name) {
      status
      message
      genre {
        id
        name
        slug
      }
    }
  }
`;

export const blockGenre = gql`
  mutation blockGenre($id: ID!) {
    blockGenre(id: $id) {
      status
      message
      genre {
        id
        name
        slug
        active
      }
    }
  }
`;
