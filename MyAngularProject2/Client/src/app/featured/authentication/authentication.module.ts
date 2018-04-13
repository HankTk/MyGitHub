import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginPage} from './pages/login/login.page';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule
  ],

  declarations: [
    LoginPage
  ],

  exports: [
    LoginPage
  ]

})
export class AuthenticationModule {
}
