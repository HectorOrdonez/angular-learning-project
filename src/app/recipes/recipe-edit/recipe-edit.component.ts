import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  private editMode: 'new' | 'edit' = 'new'
  private editingRecipe: Recipe

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {

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

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''

    if (this.editMode) {
      recipeName = this.editingRecipe.name
      recipeImagePath = this.editingRecipe.imagePath
      recipeDescription = this.editingRecipe.description
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })

    console.log(recipeName)
    console.log(recipeImagePath)
    console.log(recipeDescription)

  }
}
