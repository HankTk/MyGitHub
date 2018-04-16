import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './pages/login/login.page';

@NgModule({
  imports: [CommonModule, FormsModule, AuthenticationRoutingModule],

  declarations: [LoginPageComponent],

  exports: [LoginPageComponent]
})
export class AuthenticationModule {}
