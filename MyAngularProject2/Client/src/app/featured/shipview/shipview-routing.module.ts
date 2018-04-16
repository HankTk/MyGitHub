import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipviewPageComponent } from './pages/shipview/shipview.page';

const routes: Routes = [
  {
    path: '',
    component: ShipviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ShipviewRoutingModule {}
