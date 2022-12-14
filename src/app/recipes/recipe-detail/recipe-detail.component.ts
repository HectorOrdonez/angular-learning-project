import {Component, OnInit} from '@angular/core';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private id: number

  constructor(private recipeService: RecipeService, private router: Router, private activedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activedRoute.data.subscribe((data: Data) => {
      this.recipe = data['recipe']
      this.id = this.activedRoute.params['id']
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activedRoute})
  }

  onDeleteRecipe() {
    this.recipeService.delete(this.id)
    this.router.navigate(['/recipes'])
  }
}
