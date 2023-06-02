import {Component, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @Output() onSave = new EventEmitter<Ingredient>()
  handleSave(name: string, amount: number) {
    this.onSave.emit(new Ingredient(name, amount))
  }

  protected readonly parseInt = parseInt;
}
