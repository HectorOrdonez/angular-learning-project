import {Recipe} from "./recipes/recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeService} from "./recipes/recipe.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipesService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    console.log('resolving recipe Id: ' + route.params['id'])
    const recipe = this.recipesService.getById(route.params['id']);

    console.log(recipe)
    return recipe
  }

}
