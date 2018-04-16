import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasPageComponent } from './pages/cameras/cameras.page';

const routes: Routes = [
  {
    path: '',
    component: CamerasPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class CamerasRoutingModule {}
