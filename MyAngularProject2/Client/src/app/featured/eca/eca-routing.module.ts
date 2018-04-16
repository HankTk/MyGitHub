import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcaPageComponent } from './pages/eca/eca.page';

const routes: Routes = [
  {
    path: '',
    component: EcaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class EcaRoutingModule {}
