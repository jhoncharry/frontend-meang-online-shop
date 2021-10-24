import gql from 'graphql-tag';

export const resultInfoFragment = gql`
  fragment ResultInfoObject on ResultInfo {
    page
    pages
    total
    itemsPage
  }
`;
