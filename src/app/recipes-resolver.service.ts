import {Recipe} from "./recipes/recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {DataStorageService} from "./shared/data-storage.service";
import {RecipeService} from "./recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    }

    return recipes
  }

}
