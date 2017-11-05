/**
 * reducers.js
 *
 */
import {combineReducers} from 'redux';
import {
    CHANGE_NAME,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    CHANGE_DESCRIPTION,
    CHANGE_URL,
    INITIALIZE_FORM,
    SELECTED_ITEM,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED} from './actions';

/**
 * initialState
 *
 * @type {{form: {name: string, username: string}, accounts: {isFetching: boolean, accountArray: Array}}}
 */
const initialState = {
    // The string entered in AddAccountForm
    form: {
        name: '',
        username: '',
        password: '',
        description: '',
        url: ''
    },
    accounts: {
        // Whether it is getting a list of accounts from the server
        isFetching: false,
        // Array to include a list of accounts
        accountArray: []
    },
    selectedItem: null
};

/**
 * formReducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const formReducer = (state = initialState.form, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
        case CHANGE_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.description
            };
        case CHANGE_URL:
            return {
                ...state,
                url: action.url
            };
        case INITIALIZE_FORM:
            return initialState.form;
        default:
            return state
    }
};

/**
 * accountsReducer
 *
 * @param state
 * @param action
 * @returns {{isFetching: boolean, accountArray: Array}}
 */
const accountsReducer = (state = initialState.accounts, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                accountArray: action.accountArray
            };
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state
    }
};

/**
 * selectedItemReducer
 *
 * @param state
 * @param action
 * @returns {{isFetching: boolean, accountArray: Array}}
 */
const selectedItemReducer = (state = initialState.selectedItem, action) => {
    switch (action.type) {
        case SELECTED_ITEM:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state
    }
};

/**
 * rootReducer
 *
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    form: formReducer,
    accounts: accountsReducer,
    selectedItem: selectedItemReducer
});

// export
export default rootReducer
