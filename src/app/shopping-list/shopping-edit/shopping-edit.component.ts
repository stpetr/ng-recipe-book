import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', {static: false}) ingredientForm?: NgForm;
  startedEditingSub?: Subscription;
  isEditMode = false
  editedIngredientIndex = -1;
  editedIngredient?: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.startedEditingSub = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedIngredientIndex = index;
      this.isEditMode = true;
      this.editedIngredient = this.shoppingListService.getIngredient(index);

      this?.ingredientForm?.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount,
      });
    });
  }

  ngOnDestroy() {
    this.startedEditingSub?.unsubscribe();
  }

  handleSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.isEditMode) {
      this.shoppingListService.updatedIngredient(this.editedIngredientIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.clearForm()
  }

  handleClear() {
    this.clearForm()
  }

  handleDelete() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.clearForm();
  }

  private clearForm() {
    this.ingredientForm?.reset();
    this.isEditMode = false;
    this.editedIngredientIndex = -1;
    this.editedIngredient = undefined;
  }
}
