/**
 * AddAccountForm.js
 *
 */
import React, {Component} from 'react';
import axios from 'axios'

import TextField from 'material-ui/TextField';

import {
    changeName,
    changeUsername,
    changePassword,
    changeDescription,
    changeURL,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
    initializeForm
} from '../../redux/actions'


/**
 * AccountForm
 *
 */
export default
class AccountForm extends Component {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            store: props.store,
            actions: props.actions,
            mode: props.mode
        };
    }

    /**
     * Render
     *
     * @returns {XML}
     */
    render() {

        // Store
        const store = this.state.store;
        const actions = this.state.actions;
        const mode = this.state.mode;

        // Style
        const field = {
            width: '100%'
        };

        // Retrieve form content from store
        const {name, username, password, description, url} = store.getState().form;

        /**
         * handleCreateAccount
         *
         * @param e
         */
        const handleCreateAccount = e => {

            // Suppress default behavior when submitting form
            e.preventDefault();

            // POST an object consisting of account's name, age to the server
            axios.post('/api/accounts', {
                name,
                username,
                password,
                description,
                url
            })

            // Console output for confirmation of operation to be performed later
                .then(response => {
                    console.log(response);
                    // Initialize form after submit
                    store.dispatch(initializeForm());

                    // Refresh List
                    const _accountArray = response.data;
                    store.dispatch(receiveDataSuccess(_accountArray));
                })

                // Catch Error
                .catch(err => {
                    console.error(new Error(err))
                })
        };

        /**
         * handleUpdateAccount
         *
         * @param id
         */
        const handleUpdateAccount = e => {
            store.dispatch(requestData());
            let selected = store.getState().form;
            let id = selected._id;
            axios.put(`/api/accounts/${id}`, {
                name,
                username,
                password,
                description,
                url
            })
                .then(response => {
                    const _accountArray = response.data;
                    store.dispatch(receiveDataSuccess(_accountArray));
                })
                .catch(err => {
                    console.error(new Error(err));
                    store.dispatch(receiveDataFailed());
                })
        };

        /**
         * handleSubmit
         *
         * @param e
         */
        const handleSubmit = e => {

            // Suppress default behavior when submitting form
            e.preventDefault();
            if (mode === 'Add') {
                handleCreateAccount(e);
            }
            else {
                handleUpdateAccount(e);
            }
        };

        /**
         * Retrun
         *
         */
        return (
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <TextField
                        type='text'
                        floatingLabelText='Name'
                        value={name}
                        onChange={e => store.dispatch(changeName(e.target.value))}
                        style={field}
                        /*
                         onChange={(e)=>this.saveAccountProp('volumeSize',e)}
                         errorText={model.volumeSizeErrorText}
                         hintText={model.capacityHint}
                         */
                    />
                    <TextField
                        type='text'
                        floatingLabelText='Username'
                        value={username}
                        onChange={e => store.dispatch(changeUsername(e.target.value))}
                        style={field}
                    />
                    <TextField
                        type='text'
                        floatingLabelText='Password'
                        value={password}
                        onChange={e => store.dispatch(changePassword(e.target.value))}
                        style={field}
                    />
                    <TextField
                        type='text'
                        floatingLabelText='Description'
                        value={description}
                        onChange={e => store.dispatch(changeDescription(e.target.value))}
                        style={field}
                    />
                    <TextField
                        type='text'
                        floatingLabelText='URL'
                        value={url}
                        onChange={e => store.dispatch(changeURL(e.target.value))}
                        style={field}
                    />

                    {/* Action Buttons*/}
                    {actions}
                </form>
            </div>
        )
    }
}
