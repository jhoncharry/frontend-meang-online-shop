import { gql } from 'apollo-angular';
import { genresFragment } from '../fragment/genres.fragment';
import { resultInfoFragment } from '../fragment/result-info.fragment';
import { userFragment } from '../fragment/user.fragment';

export const getGenres = gql`
  query getGenres($page: Int, $itemsPage: Int) {
    genres(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      genres {
        ...GenreObject
      }
    }
  }
  ${genresFragment}
  ${resultInfoFragment}
`;
