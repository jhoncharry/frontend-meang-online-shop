import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import { register } from 'src/app/@graphql/operators/mutation/user.mutation';
import { getUsers } from 'src/app/@graphql/operators/query/user.query';
import { ApiService } from 'src/app/@graphql/service/api.service';
import { IRegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  // Get users
  getUsers(page: number = 1, itemsPage: number = 20) {
    return this.get(getUsers, { include: true, page, itemsPage }).pipe(
      first(),
      map((result: any) => result)
    );
  }

  // Register user
  register(user: IRegisterForm) {
    return this.set(register, { user, include: false }).pipe(
      first(),
      map((result: any) => result)
    );
  }
}
