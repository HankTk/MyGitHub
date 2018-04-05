import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipviewPageComponent } from './pages/shipview/shipview.page';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'overview', pathMatch: 'full', component: ShipviewPageComponent},
  {path: '', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
