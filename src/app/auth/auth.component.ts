import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginMode = true
  loading: boolean = false;
  error: string = null

  constructor(private authService: AuthService) {
  }

  onToggleMode() {
    this.loginMode = !this.loginMode
  }

  onSubmit(authForm: NgForm) {
    if (this.loginMode) {
      this.login(authForm)
    } else {
      this.register(authForm)
    }
  }

  private login(authForm: NgForm) {
    this.loading = true

    this.authService.login(authForm.value.email, authForm.value.password).subscribe(response => {
      this.loading = false
    }, errorResponse => {
      this.error = errorResponse
      this.loading = false
    })
  }

  private register(authForm: NgForm) {
    this.loading = true

    this.authService.register(authForm.value.email, authForm.value.password).subscribe(response => {
      this.loading = false
    }, errorMessage => {
      this.error = errorMessage
      this.loading = false
    })
  }
}
