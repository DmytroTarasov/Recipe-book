import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-854ab-default-rtdb.firebaseio.com/recipes.json'
            );
        }),
        map((recipes) => {
            return recipes.map((recipe) => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
            });
        }),
        map((recipes) => {
            // will be automatically dispatched by a ngrx/effects
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({ dispatch: false })
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        // withLatestFrom operator will select a recipes slice from the store and then merge
        // ofType(...) Observable with 'this.store.select('recipes')' Observable and pass 2 values that these Observables emit
        // as an array argument into a switchMap()
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            // here, we use array destructuring
            return this.http.put(
                'https://ng-course-recipe-book-854ab-default-rtdb.firebaseio.com/recipes.json',
                recipesState.recipes
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}
