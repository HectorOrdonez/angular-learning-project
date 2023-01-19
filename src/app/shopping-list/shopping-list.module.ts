import {NgModule} from "@angular/core";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListComponent} from "./shopping-list.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule,
  ],
})
export class ShoppingListModule {
}
