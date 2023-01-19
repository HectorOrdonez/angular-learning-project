import {NgModule} from "@angular/core";

import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipesComponent} from "./recipes.component";
import {RecipesUnselectedComponent} from "./recipes.unselected.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";
import {RecipeService} from "./recipe.service";

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesComponent,
    RecipesUnselectedComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    RecipesRoutingModule,
    SharedModule,
  ],
  providers: [
    RecipeService,
  ],
})
export class RecipesModule {
}
