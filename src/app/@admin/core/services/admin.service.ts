import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import { dashboardStatsElements } from 'src/app/@graphql/operators/query/dashboard.query';
import { ApiService } from 'src/app/@graphql/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getStats() {
    return this.get(dashboardStatsElements).pipe(
      first(),
      map((result: any) => {
        return {
          users: result.data.users,
          platforms: result.data.platforms,
          genres: result.data.genres,
          tags: result.data.tags,
          storeProduct: result.data.storeProduct,
          games: result.data.products,
        };
      })
    );
  }
}
