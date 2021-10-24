import gql from 'graphql-tag';

export const genresFragment = gql`
  fragment GenreObject on Genre {
    id
    name
    slug
  }
`;
