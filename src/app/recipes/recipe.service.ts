import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test recipe A', 'This is the A recipe', 'https://tinyurl.com/2p2sc9z7'),
    new Recipe('Test recipe B', 'This is the B recipe', 'https://tinyurl.com/2p2sc9z7'),
    new Recipe('Test recipe C', 'This is the C recipe', 'https://tinyurl.com/2p2sc9z7'),
  ]

  public recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return [...this.recipes];
  }
}
