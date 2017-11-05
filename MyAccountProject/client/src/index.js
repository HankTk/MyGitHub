/**
 * index.js
 *
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import rootReducer from './redux/reducers'
import ViewMain from './views/ViewMain'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

/**
 * store
 *
 * @type {Store<S>}
 */
const store = createStore(rootReducer);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * render
 *
 */
const render = () => {
    ReactDOM.render(
        <MuiThemeProvider>
            <ViewMain store={store}/>
        </MuiThemeProvider>,
        document.getElementById('root')
    );
};

/**
 * subscribe
 *
 */
store.subscribe(() => {

    render();

    // Console output for confirmation of operation
    console.log(store.getState().form);
});

// Render
render();
