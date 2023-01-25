import {Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions'
import * as fromApp from '../store/appReducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe(
      '1 Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      '2 Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
  ];

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.createMany(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  getById(id: number) {
    return this.recipes[id]
  }

  add(newRecipe: Recipe): void {
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  update(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  delete(index: number): void {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
