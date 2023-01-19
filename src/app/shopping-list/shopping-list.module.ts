import {NgModule} from "@angular/core";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListComponent} from "./shopping-list.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    RouterModule.forChild([{path: '', component: ShoppingListComponent}]),
    SharedModule,
  ],
  providers: [
    ShoppingListService,
    LoggingService,
  ],
})
export class ShoppingListModule {
}
