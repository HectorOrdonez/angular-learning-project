import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthResponseData} from "./auth-response.data";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts'
  readonly KEY = 'AIzaSyCWtZnwnKypFOc8geLHSk9vRhlXq0FBNuA'
  readonly REGISTER_ENDPOINT = `${this.AUTH_ROOT}:signUp?key=${this.KEY}`
  readonly LOGIN_ENDPOINT = `${this.AUTH_ROOT}:signInWithPassword?key=${this.KEY}`

  user = new BehaviorSubject<User>(null)

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {

    return this.httpClient.post<AuthResponseData>(this.LOGIN_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(response => {
        this.user.next(new User(response.localId, response.email, response.idToken, +response.expiresIn))
      })
    )
  }

  register(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.REGISTER_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(response => {
        this.user.next(new User(response.localId, response.email, response.idToken, +response.expiresIn))
      })
    )
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse)
    let errorMessage = 'Something terrible happened!'

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already in use'
        break
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Your credentials are not correct. Verify email and password'
        break
    }

    return throwError(errorMessage)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
  }
}
