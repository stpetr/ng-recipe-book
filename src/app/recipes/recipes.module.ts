import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {

}
