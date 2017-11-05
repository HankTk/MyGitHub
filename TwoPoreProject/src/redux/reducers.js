/**
 * reducers.js
 *
 */
import {combineReducers} from 'redux';
import {
    // Project
    REQUEST_DATA_PROJECT,
    RECEIVE_DATA_SUCCESS_PROJECT,
    RECEIVE_DATA_FAILED_PROJECT,

    // Page
    REQUEST_DATA_PAGE,
    RECEIVE_DATA_SUCCESS_PAGE,
    RECEIVE_DATA_FAILED_PAGE,

    // Selected
    SELECTED_ITEM_PROJECT,
    SELECTED_ITEM_PAGE,
    SELECTED_ITEM_DETAIL
} from './actions';

/**
 * initialState
 *
 * @type {{twopore: {
 * isFetchingProject: boolean,
 * projectArray: Array,
 * pageArray: Array,
 * pageData: null},
 * selectedItem: null,
 * selectedProject: {selectedItem: {name: string}},
 * selectedPage: {selectedItem: {pageid: string}}}}
 */
const initialState = {

    // Two Pore
    twopore: {

        // Whether it is getting a list of twopore from the server
        isFetchingProject: false,

        // Whether it is getting a list of twopore from the server
        isFetchingPage: false,

        // Array to include a list of Project
        projectArray: [],

        // Array to include a list of Page
        pageArray: [],

        // Selected Page Data
        pageData: null
    },

    selectedItem: null,

    selectedProject: {
        selectedItem: {
            name: ''
        }
    },

    selectedPage: {
        selectedItem: {
            pageid: ''
        }
    }

};

/**
 * twoporeReducer
 *
 * @param state
 * @param action
 * @returns {{isFetchingProject: boolean, projectArray: Array}}
 */
const twoporeReducer = (state = initialState.twopore, action) => {
    switch (action.type) {
        case REQUEST_DATA_PROJECT:
            return {
                ...state,
                isFetchingProject: true
            };
        case RECEIVE_DATA_SUCCESS_PROJECT:
            return {
                ...state,
                isFetchingProject: false,
                projectArray: action.projectArray
            };
        case RECEIVE_DATA_FAILED_PROJECT:
            return {
                ...state,
                isFetchingProject: false
            };
        case REQUEST_DATA_PAGE:
            return {
                ...state,
                isFetchingPage: true
            };
        case RECEIVE_DATA_SUCCESS_PAGE:
            return {
                ...state,
                isFetchingPage: false,
                pageArray: action.pageArray
            };
        case RECEIVE_DATA_FAILED_PAGE:
            return {
                ...state,
                isFetchingPage: false
            };
        case SELECTED_ITEM_DETAIL:
            return {
                ...state,
                pageData: action.pageData
            };
        default:
            return state
    }
};

/**
 * selectedItemProjectReducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const selectedItemProjectReducer = (state = initialState.selectedProject, action) => {
    switch (action.type) {
        case SELECTED_ITEM_PROJECT:
            return {
                ...state,
                selectedItem: action.selectedProject
            };
        default:
            return state
    }
};

/**
 * selectedItemPageReducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const selectedItemPageReducer = (state = initialState.selectedPage, action) => {
    switch (action.type) {
        case SELECTED_ITEM_PAGE:
            return {
                ...state,
                selectedItem: action.selectedPage
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
    twopore: twoporeReducer,
    selectedProject: selectedItemProjectReducer,
    selectedPage: selectedItemPageReducer,
});

// export
export default rootReducer
