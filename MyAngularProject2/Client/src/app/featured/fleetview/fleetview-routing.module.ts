import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetviewPageComponent } from './pages/fleetview/fleetview.page';

const routes: Routes = [
  {
    path: '',
    component: FleetviewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class FleetviewRoutingModule {}
