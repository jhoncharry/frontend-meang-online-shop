import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, first, map, tap } from 'rxjs/operators';

import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import {
  getMe,
  loginRestricted,
  logout,
  renewToken,
} from 'src/app/@graphql/operators/query/user.query';
import { ApiService } from 'src/app/@graphql/service/api.service';
import { ILoginForm } from 'src/app/@core/interfaces/login-form.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  public user: User;

  constructor(apollo: Apollo) {
    super(apollo);
  }

  get token(): string {
    return localStorage.getItem('v1_leaf') || '';
  }

  // Check if there's a user logged in
  isLoggedIn(): Observable<boolean | null> {
    if (!this.token || !uuidValidate(this.token)) {
      return of(false);
    }
    return this.validateToken();
  }

  // Check if user session is valid, sending for new token.
  validateToken() {
    return this.get(renewToken).pipe(
      first(),
      map(({ data: { renewToken }, loading, errors }) => {
        if (renewToken) {
          const {
            user: { _id, name, lastname, email, role },
          } = renewToken;
          this.user = new User(_id, name, lastname, email, role);
          return true;
        }
        this.logout();
        return false;
      }),
      catchError((error) => {
        this.logout();
        return of(false);
      })
    );
  }

  // User login method
  login(formData: ILoginForm) {
    return this.get(loginRestricted, { ...formData, include: false }).pipe(
      first(),
      tap(({ data: { loginRestricted } }) => {
        if (loginRestricted) {
          localStorage.setItem('v1_leaf', uuidv4());
          const { user } = loginRestricted;
        }
      })
    );
  }

  // User logout method
  logout() {
    localStorage.removeItem('v1_leaf');
    this.apollo.client.resetStore();
    return this.get(logout).pipe(
      first(),
      map((result: any) => result),
      finalize(() => {})
    );
  }

  // Get me method
  getMe() {
    return this.get(getMe).pipe(map((result: any) => result));
  }
}
