import {NgModule} from "@angular/core";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlaceholderDirective} from "./directive/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertComponent,
    CommonModule,
    DropdownDirective,
    FormsModule,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    ReactiveFormsModule,
  ],
})
export class SharedModule {

}
