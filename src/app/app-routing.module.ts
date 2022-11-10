import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipesUnselectedComponent} from "./recipes/recipes.unselected.component";
import {RecipeResolver} from "./recipe-resolver.service";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes/unselected', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipesUnselectedComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}}
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
