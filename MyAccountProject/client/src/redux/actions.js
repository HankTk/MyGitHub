/**
 * actions.js
 *
 */

// Constants
export const CHANGE_NAME          = 'CHANGE_NAME';
export const CHANGE_USERNAME      = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD      = 'CHANGE_PASSWORD';
export const CHANGE_DESCRIPTION   = 'CHANGE_DESCRIPTION';
export const CHANGE_URL           = 'CHANGE_URL';
export const INITIALIZE_FORM      = 'INITIALIZE_FORM';

export const SELECTED_ITEM        = 'SELECTED_ITEM';

export const REQUEST_DATA         = 'REQUEST_DATA';
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS';
export const RECEIVE_DATA_FAILED  = 'RECEIVE_DATA_FAILED';

// action creaters
export const changeName = name => ({
    type: CHANGE_NAME,
    name
});

export const changeUsername = username => ({
    type: CHANGE_USERNAME,
    username
});

export const changePassword = password => ({
    type: CHANGE_PASSWORD,
    password
});

export const changeDescription = description => ({
    type: CHANGE_DESCRIPTION,
    description
});

export const changeURL = url => ({
    type: CHANGE_URL,
    url
});

export const initializeForm = () => ({
    type: INITIALIZE_FORM
});

export const selectedItem = () => ({
    type: SELECTED_ITEM
});

export const requestData = () => ({
    type: REQUEST_DATA
});

export const receiveDataSuccess = accountArray => ({
    type: RECEIVE_DATA_SUCCESS,
    accountArray
});

export const receiveDataFailed = () => ({
    type: RECEIVE_DATA_FAILED
});

