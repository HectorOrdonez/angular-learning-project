import {Actions, Effect, ofType} from '@ngrx/effects'
import * as AuthActions from './auth.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {AuthResponseData} from "../auth-response.data";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../user.model";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthEffects {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts';
  readonly KEY = 'AIzaSyCWtZnwnKypFOc8geLHSk9vRhlXq0FBNuA';
  readonly LOGIN_ENDPOINT = `${this.AUTH_ROOT}:signInWithPassword?key=${this.KEY}`;

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.httpClient.post<AuthResponseData>(this.LOGIN_ENDPOINT, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(responseData => {
          const expiresInMilliseconds = +responseData.expiresIn * 1000
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInMilliseconds)

          return of(new AuthActions.Login({
            email: responseData.email,
            userId: responseData.localId,
            token: responseData.idToken,
            expirationDate: expirationDate,
          }));
        }),
        catchError(error => {
          // We have to return a non-error observable
          return of();
        }),
      );
    })
  )

  constructor(private actions$: Actions, private httpClient: HttpClient) {
    console.log('Auth Effects constructor')
  }
}
