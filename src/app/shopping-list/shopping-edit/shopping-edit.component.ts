import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

    onAddItem(addItemForm: NgForm) {
    const ingName = addItemForm.value.name
    const ingAmount = addItemForm.value.amount
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

}
