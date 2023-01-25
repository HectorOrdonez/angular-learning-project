import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('itemForm') itemForm: NgForm
  editMode = false
  editedItem: Ingredient
  private startedEditingSubscription: Subscription

  constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.startedEditingSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true
        this.editedItem = stateData.editedIngredient
        this.itemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      } else {
        this.editMode = false
      }
    })
    // this.startedEditingSubscription = this.slService.startedEditing.subscribe((index) => {
    //   const item = this.slService.getIngredient(index)
    //
    //   this.itemForm.setValue({
    //     name: item.name,
    //     amount: item.amount,
    //   })
    //   this.editMode = true
    //   this.editedItemIndex = index
    // })
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onFormSubmit(form: NgForm) {
    const ingName = form.value.name
    const ingAmount = form.value.amount
    const ingredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      // this.slService.update(this.editedItemIndex, ingredient);
       const action = new ShoppingListActions.UpdateIngredient({ingredient: ingredient})
      this.store.dispatch(action)
    } else {
      // this.slService.create(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }

    this.clear()
  }

  onClear() {
    this.clear()
  }

  clear() {
    this.editMode = false
    this.itemForm.reset()
    // this.editedItemIndex = undefined
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onDelete() {
    // this.slService.delete(this.editedItemIndex)
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.clear()
  }
}
