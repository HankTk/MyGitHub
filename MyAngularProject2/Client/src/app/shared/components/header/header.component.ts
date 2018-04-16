import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/Authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public isAuthenticated: Boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.getIsAuthenticated();
    this.subscription.add(
      this.authenticationService
        .getIsAuthenticated_observable()
        .subscribe(data => {
          this.isAuthenticated = data;
        })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
