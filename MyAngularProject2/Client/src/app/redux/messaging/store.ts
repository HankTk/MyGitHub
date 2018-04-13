/**
 * messaging store
 *
 */
import {tassign} from 'tassign';
import {MESSAGE_INCREMENT, MESSAGE_DECREMENT} from './actions';

/**
 * IMessagingState
 *
 */
export interface IMessagingState {
  newMessages: number;
}

/**
 * MESSAGING_INITIAL_STATE
 *
 * @type {{newMessages: number}}
 */
export const MESSAGING_INITIAL_STATE: IMessagingState = {
  newMessages: 0
}

/**
 * increment
 *
 * @param state
 * @param action
 * @returns {U}
 */
function increment(state, action) {
  return tassign(state, {newMessages: state.newMessages + 1});
}

/**
 * decrement
 *
 * @param state
 * @param action
 * @returns {U}
 */
function decrement(state, action) {
  return tassign(state, {newMessages: state.newMessages - 1});
}

/**
 * messagingReducer
 *
 * @param {IMessagingState} state
 * @param action
 * @returns {IMessagingState}
 */
export function messagingReducer(state: IMessagingState = MESSAGING_INITIAL_STATE, action): IMessagingState {

  switch (action.type) {
    case MESSAGE_INCREMENT:
      return increment(state, action);
    case MESSAGE_DECREMENT:
      return decrement(state, action);
  }

  return state;
}
