import { gql } from 'apollo-angular';

export const dashboardStatsElements = gql`
  {
    users: totalElements(collection: "users")
    platforms: totalElements(collection: "platforms")
    tags: totalElements(collection: "tags")
    genres: totalElements(collection: "genres")
    storeProduct: totalElements(collection: "products_platforms")
    products: totalElements(collection: "products")
  }
`;
