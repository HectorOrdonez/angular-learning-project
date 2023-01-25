import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from "@ngrx/store";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {RecipeService} from "./recipes/recipe.service";
import * as fromApp from './store/appReducer'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  bootstrap: [AppComponent],
  providers: [
    RecipeService,
  ],
})
export class AppModule {
}

