import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../../shared/services/Authentication.service';

@Component({
  template: ' '
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
