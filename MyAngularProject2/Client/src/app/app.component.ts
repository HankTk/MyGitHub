import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from './shared/services/Authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public isAuthenticated: Boolean = false;

  /**
   * constructor
   *
   * @param {Router} router
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
    this.router.navigate(['./login']);

    this.isAuthenticated = this.authenticationService.getIsAuthenticated();

    this.subscription.add(
      this.authenticationService
        .getIsAuthenticated_observable()
        .subscribe(data => {
          this.isAuthenticated = data;
        })
    );
  }

  onLogoutClick() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
