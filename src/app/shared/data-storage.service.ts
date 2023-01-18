import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  readonly FIREBASE_ROOT = 'https://ng-course-recipe-book-34272-default-rtdb.europe-west1.firebasedatabase.app'
  readonly RECIPES_ENDPOINT = `${this.FIREBASE_ROOT}/recipes.json`

  constructor(private client: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()

    // Firebase allows put requests to replace previous data with current request
    this.client.put(this.RECIPES_ENDPOINT, recipes)
      .subscribe(response => {
      })
  }

  fetchRecipes() {
    return this.client.get<Recipe[]>(this.RECIPES_ENDPOINT).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return <Recipe>{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      })
    )
  }
}
