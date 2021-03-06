import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.page';

const routes: Routes = [{ path: 'login', component: LoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
