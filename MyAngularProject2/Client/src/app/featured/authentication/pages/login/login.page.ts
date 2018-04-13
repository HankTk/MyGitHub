import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/Authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  // Form Fields
  public form_username: string;
  public form_password: string;
  public message: string;

  /**
   * constructor
   *
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
  }

  /**
   * onClickLogin
   *
   */
  onClickLogin(form) {

    const self = this;

    if (form.invalid) {
      return;
    }

    // Login - Get Token
    const username = form.value.username;
    const password = form.value.password;
    this.authenticationService.login(
      username, password,
      self.loginSuccessHandler.bind(self),
      self.loginFailureHandler.bind(self)
    );
  }

  /**
   * loginSuccessHandler
   *
   */
  loginSuccessHandler(res) {
    this.router.navigate(['./home']);
  }

  /**
   * loginFailureHandler
   *
   */
  loginFailureHandler(err) {
    /*
    this.router.navigate(['./login']);
    */
    this.message = err.error.message;
  }

}
