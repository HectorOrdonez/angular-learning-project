import {Component} from '@angular/core';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes-unselected',
  templateUrl: './recipes.unselected.component.html',
  providers: [RecipeService]
})
export class RecipesUnselectedComponent {
}
