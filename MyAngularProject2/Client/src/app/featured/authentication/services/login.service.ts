/**
 *
 * LoginService
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { LoginModel } from './../models/login.model';

@Injectable()
export class LoginService {
  // Headers
  private headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  // URL
  public url;

  /**
   * constructor
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * login
   *
   * @param {LoginModel} loginObj
   * @returns {Observable<any>}
   */
  public login(loginObj: LoginModel): Observable<any> {
    const body = JSON.stringify(loginObj);

    return this.http
      .post('/api/login', body, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * handleErrorObservable
   *
   * @param {HttpResponse<any> | any} error
   * @returns {ErrorObservable}
   */
  private handleErrorObservable(error: HttpResponse<any> | any) {
    return Observable.throw(error.message || error);
  }

  /**
   * extractData
   *
   * @param {HttpResponse<any>} res
   * @returns {{}}
   */
  private extractData(res: HttpResponse<any>) {
    const body = res;
    return body || {};
  }

  /**
   * passwordRedirect
   *
   * @param userEmailId
   * @returns {Observable<any>}
   */
  public passwordRedirect(userEmailId) {
    const body = { userEmailId: userEmailId };
    return this.http
      .post('/api/post/verifySecKey', body, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  /**
   * appEnvironment
   *
   * @returns {Observable<any>}
   */
  public appEnvironment(): Observable<any> {
    return this.http.get('/api/env', {});
  }
}
