import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponseData} from "./auth-response.data";

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts'
  readonly KEY = 'AIzaSyCWtZnwnKypFOc8geLHSk9vRhlXq0FBNuA'
  readonly REGISTER_ENDPOINT = `${this.AUTH_ROOT}:signUp?key=${this.KEY}`
  readonly LOGIN_ENDPOINT = `${this.AUTH_ROOT}:signInWithPassword?key=${this.KEY}`

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    console.log(`Attempting to login with ${email} and ${password}`)

    return this.httpClient.post<AuthResponseData>(this.LOGIN_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  register(email: string, password: string): Observable<AuthResponseData> {
    console.log(`Attempting to register with ${email} and ${password}`)

    return this.httpClient.post<AuthResponseData>(this.REGISTER_ENDPOINT, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
