import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {AuthResponseData} from "./auth-response.data";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/directive/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private closeSub: Subscription
  loginMode = true

  loading: boolean = false;
  error: string = null
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub)
    {
      this.closeSub.unsubscribe()
    }
  }

  onToggleMode() {
    this.loginMode = !this.loginMode
  }

  onSubmit(authForm: NgForm) {
    let authObs: Observable<AuthResponseData>

    this.error = null
    this.loading = true
    authObs = this.loginMode ? this.login(authForm) : this.register(authForm)

    authObs.subscribe(response => {
      this.loading = false
      this.router.navigate(['/recipes'])
    }, errorResponse => {
      this.error = errorResponse
      this.showErrorAlert(errorResponse)
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

  private showErrorAlert(message: string) {
    const componentRef = this.alertHost.viewContainerRef.createComponent<AlertComponent>(AlertComponent)
    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.alertHost.viewContainerRef.clear()
      this.closeSub.unsubscribe()
    })
  }
}
