import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RmdPageComponent } from './pages/rmd/rmd.page';

const routes: Routes = [
  {
    path: '',
    component: RmdPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class RmdRoutingModule {}
