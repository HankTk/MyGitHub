/**
 * CasesService
 *
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/store';
import {BaseApiService} from './BaseApiService';
import {CASES_LOAD} from '../../redux/cases/actions';
import {API_REQUEST_ERROR, API_REQUEST_SUCCESS} from '../../redux/actions';

@Injectable()
export class CasesService extends BaseApiService {

  private readonly resourceName = '/api/cases';

  /**
   * constructor
   *
   * @param {HttpClient} httpClient
   * @param {NgRedux<IAppState>} ngRedux
   */
  constructor(
    protected httpClient: HttpClient,
    protected ngRedux: NgRedux<IAppState>,
  ) {
    super(httpClient, ngRedux);
  }

  /**
   * loadCases
   *
   */
  loadCases() {
    const resource = this.resourceName;
    super.loadData(resource,
      (res) => {
        // Dispatch Load Event
        this.ngRedux.dispatch({type: CASES_LOAD, data: res});
        this.callbackSuccess(res);
      },
      (err) => this.callbackError(err));
  }

  /**
   * addCase
   *
   * @param cases
   * @returns {Observable<Response>}
   */
  addCase(cases) {
    const resource = this.resourceName;
    super.addData(resource, cases,
      (res) => this.callbackSuccess(res),
      (err) => this.callbackError(err));
  }

  /**
   * removeCase
   *
   * @param cases
   * @returns {Observable<Response>}
   */
  removeCase(cases) {
    const resource = this.resourceName + '/' + cases.id;
    super.removeData(resource,
      (res) => this.callbackSuccess(res),
      (err) => this.callbackError(err));
  }

  /**
   * updateCase
   *
   * @param cases
   */
  updateCase(cases) {
    const resource = this.resourceName + '/' + cases.id;
    super.updateData(resource, cases,
      (res) => this.callbackSuccess(res),
      (err) => this.callbackError(err));
  }

  /**
   * clearCases
   *
   */
  clearCases() {
    const resource = this.resourceName;
    super.clearAll(resource,
      (res) => this.callbackSuccess(res),
      (err) => this.callbackError(err));
  }

  /**
   * callbackSuccess
   *
   * @param res
   */
  callbackSuccess(res) {
    super.callbackSuccess(res);
  }

  /**
   * callbackError
   *
   * @param err
   */
  callbackError(err) {
    super.callbackError(err);
  }

}
