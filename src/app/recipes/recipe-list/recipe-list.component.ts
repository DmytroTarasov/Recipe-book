import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    @Output() recipeWasSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
            'Description1', 
            'https://www.expatica.com/app/uploads/sites/17/2020/10/austrian-food.jpg'),
        new Recipe('A Test Recipe2', 
            'Description2', 
            'https://www.expatica.com/app/uploads/sites/17/2020/10/austrian-food.jpg')
    ];

    constructor() { }

    ngOnInit() {
    }

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }

}
