import {Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Test recipe A',
      'This is the A recipe',
      'https://tinyurl.com/2p2sc9z7',
      [
        new Ingredient('Potatoes', 1),
        new Ingredient('Eggs', 2),
      ],
    ),
    new Recipe(
      'Test recipe B',
      'This is the B recipe',
      'https://tinyurl.com/2p2sc9z7',
      [
        new Ingredient('Tomatoes', 2),
        new Ingredient('Cucumbers', 1),
        new Ingredient('Oil', 1),
        new Ingredient('Salt', 1),
      ]
    ),
    new Recipe(
      'Test recipe C',
      'This is the C recipe',
      'https://tinyurl.com/2p2sc9z7',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Butter', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
