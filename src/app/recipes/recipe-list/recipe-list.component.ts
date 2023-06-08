import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChangedSub?: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipeChangedSub?.unsubscribe();
  }
}
