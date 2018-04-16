import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TfocPageComponent } from './pages/tfoc/tfoc.page';

const routes: Routes = [
  {
    path: '',
    component: TfocPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class TfocRoutingModule {}
