import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipesUnselectedComponent} from "./recipes/recipes.unselected.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {ExerciseComponent} from "./exercise/exercise.component";
import {RecipesResolver} from "./recipes-resolver.service";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipesUnselectedComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipesResolver}},
      {path: ':id/edit', component: RecipeEditComponent, resolve: {recipe: RecipesResolver}},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'exercise', component: ExerciseComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
