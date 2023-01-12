import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginMode = true

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
    this.authService.login(authForm.value.email, authForm.value.password).subscribe(response => {
      console.log('Got a response from logging in:')
      console.log(response)
    }, error => {
      console.log('Got an error from logging in:')
      console.log(error)
    })
  }

  private register(authForm: NgForm) {
    this.authService.register(authForm.value.email, authForm.value.password).subscribe(response => {
      console.log('Got a response from registering:')
      console.log(response)
    }, error => {
      console.log('Got an error from registering:')
      console.log(error)
    })
  }
}
