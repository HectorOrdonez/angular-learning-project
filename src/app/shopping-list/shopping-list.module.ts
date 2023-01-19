import {NgModule} from "@angular/core";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListComponent} from "./shopping-list.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: 'shopping-list', component: ShoppingListComponent}])
  ],
})
export class ShoppingListModule {
}
