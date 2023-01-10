import {Component, OnInit} from '@angular/core';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  id: number
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getById(this.id)
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
