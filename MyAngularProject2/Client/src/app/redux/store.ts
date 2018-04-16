/**
 * store
 *
 */
import { tassign } from 'tassign';
import { combineReducers } from 'redux';
import { ICasesState, CASES_INITIAL_STATE, casesReducer } from './cases/store';
import {
  IMessagingState,
  MESSAGING_INITIAL_STATE,
  messagingReducer
} from './messaging/store';
import {
  IAuthenticationState,
  AUTHENTICATION_INITIAL_STATE,
  authenticationReducer
} from './authentication/store';

/**
 * IAppState
 *
 */
export interface IAppState {
  authentication: IAuthenticationState;
  caseManagement: ICasesState;
  messaging: IMessagingState;
}

/**
 * INITIAL_STATE
 *
 * @type {{caseManagement: ICasesState; messaging: IMessagingState}}
 */
export const INITIAL_STATE: IAppState = {
  authentication: AUTHENTICATION_INITIAL_STATE,
  caseManagement: CASES_INITIAL_STATE,
  messaging: MESSAGING_INITIAL_STATE
};

/**
 * rootReducer
 *
 * @type {Reducer<any>}
 */
export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  caseManagement: casesReducer,
  messaging: messagingReducer
});
