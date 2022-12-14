import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  styleUrls: ['recipe-edit.component.css'],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  private editMode: 'new' | 'edit' = 'new'
  private editingRecipe: Recipe

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      if (data['recipe'] !== undefined) {
        this.editMode = 'edit'
        this.editingRecipe = data.recipe
        this.initForm()
      }
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl(),
    }))
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      recipeName = this.editingRecipe.name
      recipeImagePath = this.editingRecipe.imagePath
      recipeDescription = this.editingRecipe.description

      if (this.editingRecipe.ingredients) {
        for (let ingredient of this.editingRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
    })
  }
}
