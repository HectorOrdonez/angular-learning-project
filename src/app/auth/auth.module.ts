import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    SharedModule,
  ],
  exports: [],
  providers: [
    AuthInterceptorService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
})
export class AuthModule {

}
