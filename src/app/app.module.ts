import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from "./app-routing.module";
import {RecipeService} from "./recipes/recipe.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";

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
    RecipesModule,
    SharedModule,
    ShoppingListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
