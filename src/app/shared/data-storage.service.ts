import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {API_URL} from "./config";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    ) {}

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(`${API_URL}/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || [],
            }
          })
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(`${API_URL}/recipes.json`, recipes)
      .subscribe();
  }
}
