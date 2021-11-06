import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import {
  addGenre,
  blockGenre,
  updateGenre,
} from 'src/app/@graphql/operators/mutation/genre.mutation';
import { ApiService } from 'src/app/@graphql/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class GenreService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  // Add genre
  addGenre(genre: any) {
    const { name } = genre;
    return this.set(addGenre, { name }).pipe(
      first(),
      map((result: any) => result)
    );
  }

  // Update genre
  updateGenre(id: any, genre: any) {
    const { name } = genre;
    return this.set(updateGenre, { id, name }).pipe(
      first(),
      map((result: any) => result)
    );
  }

  // Update genre
  blockGenre(id: any) {
    return this.set(blockGenre, { id }).pipe(
      first(),
      map((result: any) => result)
    );
  }
}
