import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly AUTH_ROOT = 'https://identitytoolkit.googleapis.com/v1/accounts'
  readonly REGISTER_ENDPOINT = (key: string) => `${this.AUTH_ROOT}:signUp?key=${key}`
  readonly LOGIN_ENDPOINT = (key: string) => `${this.AUTH_ROOT}:signInWithPassword?key=${key}`

  login(email: string, password: string) {
    console.log(`Attempting to login with ${email} and ${password}`)
  }

  register(email: string, password: string) {
    console.log(`Attempting to register with ${email} and ${password}`)
  }
}
