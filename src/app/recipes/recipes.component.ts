import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnChanges {
    selectedRecipe: Recipe;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.selectedRecipe);
    }
    
}
