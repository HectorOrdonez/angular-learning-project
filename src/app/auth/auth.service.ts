import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthResponseData} from "./auth-response.data";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts'
  readonly KEY = 'AIzaSyCWtZnwnKypFOc8geLHSk9vRhlXq0FBNuA'
  readonly REGISTER_ENDPOINT = `${this.AUTH_ROOT}:signUp?key=${this.KEY}`
  readonly LOGIN_ENDPOINT = `${this.AUTH_ROOT}:signInWithPassword?key=${this.KEY}`

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {

    return this.httpClient.post<AuthResponseData>(this.LOGIN_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'Something terrible happened!'

          if(!errorResponse.error || !errorResponse.error.error)
          {
            return throwError(errorMessage)
          }

          switch(errorResponse.error.error.message)
          {
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
              errorMessage = 'Your credentials are not correct. Verify email and password'
              break
          }

          return throwError(errorMessage)
        })
      )
  }

  register(email: string, password: string): Observable<AuthResponseData> {

    return this.httpClient.post<AuthResponseData>(this.REGISTER_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'Something terrible happened!'

          if(!errorResponse.error || !errorResponse.error.error)
          {
            return throwError(errorMessage)
          }

          switch(errorResponse.error.error.message)
          {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email already in use'
              break
          }

          return throwError(errorMessage)
        })
      )
  }
}
