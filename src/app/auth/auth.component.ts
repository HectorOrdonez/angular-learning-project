import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AuthResponseData} from "./auth-response.data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loginMode = true
  loading: boolean = false;
  error: string = null

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
    })
  }

  onToggleMode() {
    this.loginMode = !this.loginMode
  }

  onSubmit(authForm: NgForm) {
    let authObs: Observable<AuthResponseData>

    this.error = null
    this.loading = true
    authObs = this.loginMode? this.login(authForm) : this.register(authForm)

    authObs.subscribe(response => {
      this.loading = false
      this.router.navigate(['/recipes'])
    }, errorResponse => {
      this.error = errorResponse
      this.loading = false
    })
  }

  private login(authForm: NgForm): Observable<AuthResponseData> {
    return this.authService.login(authForm.value.email, authForm.value.password)
  }

  private register(authForm: NgForm): Observable<AuthResponseData> {
    return this.authService.register(authForm.value.email, authForm.value.password)
  }

  onAlertCloseEvent() {
    this.error = null
  }
}
