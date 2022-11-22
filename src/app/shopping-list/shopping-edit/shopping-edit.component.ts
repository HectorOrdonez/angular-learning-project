import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('itemForm') itemForm: NgForm
  editMode = false
  editedItemIndex: number
  private startedEditingSubscription: Subscription

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.startedEditingSubscription = this.slService.startedEditing.subscribe((index) => {
      const item = this.slService.getIngredient(index)

      this.itemForm.setValue({
        name: item.name,
        amount: item.amount,
      })
      this.editMode = true
      this.editedItemIndex = index
    })
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe()
  }

  onFormSubmit(form: NgForm) {
    const ingName = form.value.name
    const ingAmount = form.value.amount
    const ingredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
  }

}
