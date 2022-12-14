import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  styleUrls: ['recipe-edit.component.css'],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  private editMode: boolean = false
  private editingRecipe: Recipe
  private id: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) {

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      if (data['recipe'] !== undefined) {
        this.editMode = true
        this.editingRecipe = data.recipe
        this.id = this.activatedRoute.params['id']
      }
      this.initForm()
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  onSubmit() {
    // const recipe = new Recipe(this.id,
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // )
    if (this.editMode) {
      this.recipeService.update(this.id, this.recipeForm.value)
    } else {
      this.recipeService.add(this.recipeForm.value)
    }

    this.backToList()
  }

  onCancel() {
    this.backToList()
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
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
    })
  }

  private backToList(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  onDeleteIngredient(ingredientId: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientId)
  }
}
