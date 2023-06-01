import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Test recipe A', 'This is the A recipe', 'https://tinyurl.com/2p2sc9z7'),
    new Recipe('Test recipe B', 'This is the B recipe', 'https://tinyurl.com/2p2sc9z7'),
    new Recipe('Test recipe C', 'This is the C recipe', 'https://tinyurl.com/2p2sc9z7'),
  ];

  @Output() onSelectRecipe = new EventEmitter<Recipe>()

  handleSelect(recipe: Recipe) {
    this.onSelectRecipe.emit(recipe)
  }
}
