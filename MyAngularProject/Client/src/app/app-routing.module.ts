import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPage} from './featured/authentication/pages/login/login.page';

const routes: Routes = [
  {
    path: 'login', component: LoginPage
  },
  {
    path: 'home', loadChildren: './featured/overview/overview.module#OverviewModule'
  }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {
}
