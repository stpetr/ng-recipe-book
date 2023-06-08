import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  isEditMode = false;
  recipeForm?: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}

  get ingredientsControls() {
    return (<FormArray>this.recipeForm?.get('ingredients')).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
    })
  }

  handleAddIngredient() {
    (<FormArray>this.recipeForm?.get('ingredients')).push(this.getIngredientFormGroup());
  }

  handleDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm?.get('ingredients')).removeAt(index);
  }

  handleSubmit() {
    const formValues = this.recipeForm?.value;
    const recipe = new Recipe(formValues.name, formValues.description, formValues.imagePath, formValues.ingredients);
    if (this.isEditMode && this.id != null) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.router.navigate(['/recipes']);
  }

  handleCancel() {
    this.router.navigate(['/recipes']);
  }

  private getIngredientFormGroup(name= '', amount = 1) {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(
        amount,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ],
      ),
    })
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray<FormGroup>([]);

    if (this.isEditMode && typeof this.id !== 'undefined') {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe.ingredients.length) {
        recipe.ingredients.forEach((el) => {
          ingredients.push(
            this.getIngredientFormGroup(el.name, el.amount),
          );
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients,
    });
  }
}
