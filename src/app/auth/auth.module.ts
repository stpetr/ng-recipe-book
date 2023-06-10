import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SharedModule} from "../shared/shared.module";
import {AuthComponent} from "./auth.component";
import {FormsModule} from "@angular/forms";

const authRoutes: Routes = [
  { path: '', component: AuthComponent },
];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(authRoutes),
  ],
})
export class AuthModule {}
