import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(private store: Store<fromApp.AppState>) { } // 'AppState' is our global state which we've defined in the 
    // app.reducer.ts file

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList'); // this.store.select(...) returns an Observable which type will be a type of 'shoppingList' slice (that we've specified during the injection of store into this component (line 18))
        
        // this.ingredients = this.shoppingListService.getIngredients();
        // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
        //     (ingredients: Ingredient[]) => {
        //         this.ingredients = ingredients;
        //     }
        // )
    }

    onEditName(index: number) {
        // this.shoppingListService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }
}
