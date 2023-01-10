import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";

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
}
