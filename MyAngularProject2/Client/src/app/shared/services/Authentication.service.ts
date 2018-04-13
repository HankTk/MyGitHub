import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

  private username;
  private password;

  /**
   * constructor
   *
   * @param {HttpClient} http
   */
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * login
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  login(username: string, password: string, successCallback, failureCallback) {
    const self = this;
    self.username = username;
    self.password = password;

    self.httpClient.post('/api/login', {username, password}).subscribe(
      (res) => {
        self.setSession(res);
        successCallback(res);
      },
      err => {
        failureCallback(err);
      });
  }

  /**
   * private
   *
   * @param authResult
   */
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult['access_token']);
    localStorage.setItem('expires', JSON.stringify(expiresAt.valueOf()));
  }

  /**
   * logout
   *
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  /**
   * isLoggedIn
   *
   * @returns {boolean}
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * isLoggedOut
   *
   * @returns {boolean}
   */
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * getExpiration
   *
   * @returns {moment.Moment}
   */
  getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
