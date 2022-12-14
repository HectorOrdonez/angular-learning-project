import {Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {
    console.log('Recipe Service constructor called')
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.createMany(ingredients);
  }

  /**
   * Note: The internal recipe array is 0-indexed
   * @param id number
   */
  getById(id: number) {
    console.log('Getting by Id: ' + id)
    console.log(this.recipes)

    return this.recipes[id - 1]
  }

  add(newRecipe: Recipe): void {
    console.log('Adding recipe')
    newRecipe.id = this.recipes.length + 1
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  update(recipe: Recipe): void {
    this.recipes[recipe.id - 1] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }
}
