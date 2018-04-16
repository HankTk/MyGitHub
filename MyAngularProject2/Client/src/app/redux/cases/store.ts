/**
 * Case store
 *
 */
import { tassign } from 'tassign';
import {
  CASES_LOAD,
  CASES_ADD,
  CASES_UPDATE,
  CASES_REMOVE,
  CASES_CLEAR
} from './actions';
import _ from 'lodash';

/**
 * ICasesState
 *
 */
export interface ICasesState {
  cases: any[];
  lastUpdate: Date;
}

/**
 * CASES_INITIAL_STATE
 *
 * @type {{cases: Array; lastUpdate: any}}
 */
export const CASES_INITIAL_STATE: ICasesState = {
  cases: [],
  lastUpdate: null
};

/**
 * addCase
 *
 * @param state
 * @param action
 * @returns {U}
 */
function addCase(state, action) {
  // New Case
  const newCase = action.data;
  return tassign(state, {
    cases: state.cases.concat(newCase),
    lastUpdate: new Date()
  });
}

/**
 * updateCase
 *
 * @param state
 * @param action
 * @returns {U}
 */
function updateCase(state, action) {
  // Find Target Data, find the position of this item in the array.
  const cases = state.cases.filter(function(o) {
    return o.id === action.data.id;
  });
  const index = state.cases.findIndex(function(o) {
    return o.id === action.data.id;
  });

  // Update Data
  return tassign(state, {
    cases: [
      ...state.cases.slice(0, index),
      tassign(cases[0], action.data),
      ...state.cases.slice(index + 1)
    ],
    lastUpdate: new Date()
  });
}

/**
 * removeCase
 *
 * @param state
 * @param action
 * @returns {U}
 */
function removeCase(state, action) {
  // Find Target Data, find the position of this item in the array.
  const cases = state.cases.filter(function(o) {
    return o.id === action.data.id;
  });
  const index = state.cases.findIndex(function(o) {
    return o.id === action.data.id;
  });

  return tassign(state, {
    cases: state.cases.filter(t => t.id !== action.data.id),
    lastUpdate: new Date()
  });
}

/**
 * clearCases
 *
 * @param state
 * @param action
 * @returns {U}
 */
function clearCases(state, action) {
  return tassign(state, {
    cases: [],
    lastUpdate: new Date()
  });
}

/**
 * getCases
 *
 * @param state
 * @param action
 * @returns {{cases: any[]; lastUpdate: Date}}
 */
function loadCases(state, action) {
  return tassign(state, {
    cases: action.data,
    lastUpdate: new Date()
  });
}

/**
 * casesReducer
 *
 * @param {ICasesState} state
 * @param action
 * @returns {ICasesState}
 */
export function casesReducer(
  state: ICasesState = CASES_INITIAL_STATE,
  action
): ICasesState {
  switch (action.type) {
    case CASES_ADD:
      return addCase(state, action);
    case CASES_UPDATE:
      return updateCase(state, action);
    case CASES_REMOVE:
      return removeCase(state, action);
    case CASES_CLEAR:
      return clearCases(state, action);
    case CASES_LOAD:
      return loadCases(state, action);
    default: {
      break;
    }
  }
  return state;
}
