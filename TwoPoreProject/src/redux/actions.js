/**
 * actions.js
 *
 */

// Constants - Project
export const REQUEST_DATA_PROJECT         = 'REQUEST_DATA_PROJECT';
export const RECEIVE_DATA_SUCCESS_PROJECT = 'RECEIVE_DATA_SUCCESS_PROJECT';
export const RECEIVE_DATA_FAILED_PROJECT  = 'RECEIVE_DATA_FAILED_PROJECT';

// Constants - Page
export const REQUEST_DATA_PAGE            = 'REQUEST_DATA_PAGE';
export const RECEIVE_DATA_SUCCESS_PAGE    = 'RECEIVE_DATA_SUCCESS_PAGE';
export const RECEIVE_DATA_FAILED_PAGE     = 'RECEIVE_DATA_FAILED_PAGE';

// Constants - Selected Item
export const SELECTED_ITEM_PROJECT        = 'SELECTED_ITEM_PROJECT';
export const SELECTED_ITEM_PAGE           = 'SELECTED_ITEM_PAGE';

// Constants - Selected Detail
export const SELECTED_ITEM_DETAIL         = 'SELECTED_ITEM_DETAIL';

// Selected Item
export const selectedItemProjectReducer = selectedProject => ({type: SELECTED_ITEM_PROJECT, selectedProject});
export const selectedItemPageReducer = selectedPage => ({type: SELECTED_ITEM_PAGE, selectedPage});

// Project List
export const requestDataProject = () => ({type: REQUEST_DATA_PROJECT});
export const receiveDataSuccessProject = projectArray => ({type: RECEIVE_DATA_SUCCESS_PROJECT, projectArray});
export const receiveDataFailedProject = () => ({type: RECEIVE_DATA_FAILED_PROJECT});

// Page List
export const requestDataPage = () => ({type: REQUEST_DATA_PAGE});
export const receiveDataSuccessPage = pageArray => ({type: RECEIVE_DATA_SUCCESS_PAGE, pageArray});
export const receiveDataFailedPage = () => ({type: RECEIVE_DATA_FAILED_PAGE});

// Page Detail
export const pageDetailSelected = pageData => ({type: SELECTED_ITEM_DETAIL, pageData});
