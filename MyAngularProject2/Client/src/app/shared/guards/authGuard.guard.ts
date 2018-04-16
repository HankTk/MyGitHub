import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './../services/Authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.getIsAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
