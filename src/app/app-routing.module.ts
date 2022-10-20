import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngameComponent} from "./pages/ingame/ingame.component";

const routes: Routes = [
  { path: '', component: IngameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
