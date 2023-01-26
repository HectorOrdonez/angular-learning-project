import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthResponseData} from "./auth-response.data";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {Router} from "@angular/router";
import * as fromApp from '../store/appReducer'
import * as AuthActions from '../auth/store/auth.actions'
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts'
  readonly KEY = 'AIzaSyCWtZnwnKypFOc8geLHSk9vRhlXq0FBNuA'
  readonly REGISTER_ENDPOINT = `${this.AUTH_ROOT}:signUp?key=${this.KEY}`
  readonly LOGIN_ENDPOINT = `${this.AUTH_ROOT}:signInWithPassword?key=${this.KEY}`
  readonly USER_DATA_KEY = 'user_data';

  user = new BehaviorSubject<User>(null)
  private expirationTimer = null

  constructor(private httpClient: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {

    return this.httpClient.post<AuthResponseData>(this.LOGIN_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(this.handleSuccess.bind(this))
    )
  }

  register(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.REGISTER_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(this.handleSuccess.bind(this))
    )
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout())
    // this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem(this.USER_DATA_KEY)
  }

  private handleError(errorResponse: HttpErrorResponse) {
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

  private handleSuccess(response) {
    const expiresInMilliseconds = +response.expiresIn * 1000
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresInMilliseconds)

    const user = new User(response.localId, response.email, response.idToken, expirationDate)
    // this.user.next(user)
    this.store.dispatch(new AuthActions.Login({
      email: response.email,
      userId: response.localId,
      token: response.idToken,
      expirationDate: expirationDate,
    }))
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user))
    this.autoLogout(expiresInMilliseconds)
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem(this.USER_DATA_KEY))

    if (!userData) {
      return
    }

    const loadedUser = new User(userData.id, userData.email, userData._token, userData.expirationDate)

    if (!loadedUser.token) {
      return
    }

    const expiresIn = new Date(userData.expirationDate).getTime() - new Date().getTime()

    this.store.dispatch(new AuthActions.Login({
      email: loadedUser.email,
      userId: loadedUser.id,
      token: loadedUser.token,
      expirationDate: userData.expirationDate,
    }))
    // this.user.next(loadedUser)
    this.autoLogout(expiresIn)
  }

  autoLogout(expireInMilliseconds: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout()
      clearTimeout(this.expirationTimer)
      this.expirationTimer = null
    }, expireInMilliseconds)
  }
}
