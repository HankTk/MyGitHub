import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import {
  CASES_ADD,
  CASES_UPDATE,
  CASES_REMOVE,
  CASES_CLEAR
} from '../redux/cases/actions';
import { IAppState } from '../redux/store';
import { MODEL_TODO } from './model-name-constants';

@Injectable()
export class WebSocketService {
  // Socket
  private socket;

  /**
   * constructor
   *
   * @param {NgRedux<IAppState>} ngRedux
   */
  constructor(private ngRedux: NgRedux<IAppState>) {}

  /**
   * connect
   *
   * @param {string} queryString
   */
  connect(queryString: string) {
    this.socket = io({ path: '/ws' });
  }

  /**
   * on Event
   *
   * @param {string} onName
   * @returns {Observable<any>}
   */
  on(onName: string) {
    const observable = new Observable(observer => {
      this.socket.on(onName, data => {
        observer.next(data);

        // Message Broker
        this.messageBroker(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  /**
   * messageBroker
   *
   * @param message
   */
  messageBroker(message) {
    // Received Message
    switch (message.model) {
      case MODEL_TODO: {
        this.casesProcess(message);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * casesProcess
   *
   */
  casesProcess(message) {
    switch (message.action) {
      case 'create': {
        this.ngRedux.dispatch({ type: CASES_ADD, data: message.item });
        break;
      }
      case 'update': {
        this.ngRedux.dispatch({ type: CASES_UPDATE, data: message.item });
        break;
      }
      case 'delete': {
        this.ngRedux.dispatch({ type: CASES_REMOVE, data: message.item });
        break;
      }
      case 'deleteAll': {
        this.ngRedux.dispatch({ type: CASES_CLEAR });
        break;
      }
      default: {
        break;
      }
    }
  }
}
