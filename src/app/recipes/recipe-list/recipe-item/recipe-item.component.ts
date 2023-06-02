import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe('', '', '')

  constructor(private recipeService: RecipeService) {}

  handleClick() {
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}
