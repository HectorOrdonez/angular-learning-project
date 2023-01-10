import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private client: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    console.log('DataStorageService is storing these recipes:')
    console.log(recipes)

    // Firebase allows put requests to replace previous data with current request
    this.client.put('https://ng-course-recipe-book-34272-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log('Received response from Firebase:')
        console.log(response)
      })
  }

  fetchRecipes() {
    console.log('DataStorageService is fetching recipes.')
    this.client.get<Recipe[]>('https://ng-course-recipe-book-34272-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return <Recipe>{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }))
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes)
        console.log('Received response from Firebase:')
        console.log(recipes)
      })
  }
}
