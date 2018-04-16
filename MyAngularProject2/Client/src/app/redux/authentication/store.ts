/**
 * Authentication store
 *
 */
import { tassign } from 'tassign';
import {
  AUTHENTICATION_SAVE,
  AUTHENTICATION_UPDATE,
  AUTHENTICATION_REMOVE
} from './actions';
import _ from 'lodash';

/**
 * IAuthenticationState
 *
 */
export interface IAuthenticationState {
  authenticationInfo: {};
}

/**
 * AUTHENTICATION_INITIAL_STATE
 *
 * @type {{userInfo: {}}}
 */
export const AUTHENTICATION_INITIAL_STATE: IAuthenticationState = {
  authenticationInfo: {}
};

/**
 * saveAuthentication
 *
 * @param state
 * @param action
 * @returns {{authenticationInfo: *}}
 */
function saveAuthentication(state, action) {
  return tassign(state, {
    authenticationInfo: action.data
  });
}

/**
 * updateCase
 *
 * @param state
 * @param action
 * @returns {{authenticationInfo: any}}
 */
function updateAuthentication(state, action) {
  // Find Target Data, find the position of this item in the array.
  const authenticationInfo = state.authenticationInfo;

  // Update Data
  return tassign(state, {
    authenticationInfo: tassign(authenticationInfo, action.authenticationInfo)
  });
}

/**
 * clearAuthentication
 *
 * @param state
 * @param action
 * @returns {{cases: any[]}}
 */
function clearAuthentication(state, action) {
  return tassign(state, {
    authenticationInfo: {}
  });
}

/**
 * authenticationReducer
 *
 * @param {IAuthenticationState} state
 * @param action
 * @returns {IAuthenticationState}
 */
export function authenticationReducer(
  state: IAuthenticationState = AUTHENTICATION_INITIAL_STATE,
  action
): IAuthenticationState {
  switch (action.type) {
    case AUTHENTICATION_SAVE:
      return saveAuthentication(state, action);
    case AUTHENTICATION_UPDATE:
      return updateAuthentication(state, action);
    case AUTHENTICATION_REMOVE:
      return clearAuthentication(state, action);
    default: {
      break;
    }
  }
  return state;
}
