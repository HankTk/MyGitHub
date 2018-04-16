import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import { CASES_LOAD } from '../../redux/cases/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../redux/store';
import {
  AUTHENTICATION_SAVE,
  AUTHENTICATION_REMOVE,
  AUTHENTICATION_UPDATE
} from '../../redux/authentication/actions';

@Injectable()
export class AuthenticationService {
  private username;
  private password;

  private isAuthenticated: Boolean;
  private isAuthenticated_observable = new Subject<Boolean>();

  /**
   * constructor
   *
   * @param {HttpClient} http
   */
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private httpClient: HttpClient
  ) {}

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

    self.httpClient.post('/api/login', { username, password }).subscribe(
      res => {
        self.setSession(res);
        this.setIsAuthenticated_observable(true);
        successCallback(res);
      },
      err => {
        this.setIsAuthenticated_observable(false);
        failureCallback(err);
      }
    );
  }

  /**
   * private
   *
   * @param authResult
   */
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    // Save Token
    localStorage.setItem('token', authResult['token']);
    localStorage.setItem('expires', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userId', authResult['userid']);
    localStorage.setItem(
      'companyId',
      JSON.stringify(parseInt(authResult.companyid, 10))
    );

    // Save User Information into Store
    const userInfo: any = {};
    userInfo.userId = authResult['userid'];
    userInfo.username = authResult['username'];
    userInfo.token = authResult['token'];
    userInfo.role = authResult['userRole'];
    userInfo.companyId = authResult['companyid'];
    userInfo.pagesize = authResult['pagesize'];
    userInfo.configexists = authResult['configexists'];
    userInfo.appEnvironment = authResult['app_env'];

    // Dispatch Load Event
    this.ngRedux.dispatch({ type: AUTHENTICATION_SAVE, data: userInfo });
  }

  /**
   * logout
   *
   */
  logout() {
    this.setIsAuthenticated_observable(false);
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');

    // Dispatch Load Event
    this.ngRedux.dispatch({ type: AUTHENTICATION_REMOVE });
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

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }

  public getIsAuthenticated_observable() {
    return this.isAuthenticated_observable;
  }

  public setIsAuthenticated_observable(value: Boolean) {
    this.isAuthenticated = value;
    this.isAuthenticated_observable.next(value);
  }
}
