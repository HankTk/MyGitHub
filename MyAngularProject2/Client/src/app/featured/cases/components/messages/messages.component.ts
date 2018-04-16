import { Component } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../../redux/store';
import {MESSAGE_INCREMENT, MESSAGE_DECREMENT} from '../../../../redux/messaging/actions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  @select(s => s.messaging.newMessages) newMessages;

  /**
   * constructor
   *
   * @param {NgRedux<IAppState>} ngRedux
   */
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  /**
   * increment
   *
   */
  increment() {
    this.ngRedux.dispatch({type: MESSAGE_INCREMENT});
  }

  /**
   * decrement
   *
   */
  decrement() {
    this.ngRedux.dispatch({type: MESSAGE_DECREMENT});
  }

}
