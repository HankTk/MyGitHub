import {NgRedux, select} from '@angular-redux/store';
import {API_REQUEST_ERROR, API_REQUEST_SUCCESS} from '../../redux/actions';
import {HttpClient} from '@angular/common/http';
import {IAppState} from '../../redux/store';

export abstract class BaseApiService {

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
  }

  /**
   * loadData
   *
   * @param resource
   * @param callbackSuccess
   * @param callbackError
   */
  loadData(resource, callbackSuccess, callbackError) {
    this.httpClient.get(resource).subscribe(callbackSuccess, callbackError);
  }

  /**
   * addData
   *
   * @param resource
   * @param data
   * @param callbackSuccess
   * @param callbackError
   */
  addData(resource, data, callbackSuccess, callbackError) {
    this.httpClient.post(resource, data).subscribe(callbackSuccess, callbackError);
  }

  /**
   * removeData
   *
   * @param resource
   * @param callbackSuccess
   * @param callbackError
   */
  removeData(resource, callbackSuccess, callbackError) {
    this.httpClient.delete(resource).subscribe(callbackSuccess, callbackError);
  }

  /**
   * updateData
   *
   * @param resource
   * @param data
   * @param callbackSuccess
   * @param callbackError
   */
  updateData(resource, data, callbackSuccess, callbackError) {
    this.httpClient.put(resource, data).subscribe(callbackSuccess, callbackError);
  }

  /**
   * clearAll
   *
   * @param resource
   * @param callbackSuccess
   * @param callbackError
   */
  clearAll(resource, callbackSuccess, callbackError) {
    this.httpClient.delete(resource).subscribe(callbackSuccess, callbackError);
  }

  /**
   * callbackSuccess
   *
   * @param res
   */
  callbackSuccess(res) {
    // Request Success Callback
    this.ngRedux.dispatch({type: API_REQUEST_SUCCESS});
  }

  /**
   * callbackError
   *
   * @param err
   */
  callbackError(err) {
    // Request Failure Callback
    this.ngRedux.dispatch({type: API_REQUEST_ERROR});
  }

}
