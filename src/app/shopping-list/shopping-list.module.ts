import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            // here, the path includes only an empty string '' because the we use lazy loading and the routing setup was made in the app-routing.module
            { path: '', component: ShoppingListComponent }
        ]),
        SharedModule
    ]
    // !!! exports: [] section is not needed here because we manage routing in this module, not in the app.module.ts
})
export class ShoppingListModule {}