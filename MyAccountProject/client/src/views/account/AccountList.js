/**
 * AccountList.js
 *
 */
import React, {Component} from 'react';
import axios from 'axios'
import _ from 'lodash'

import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import {
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
    initializeForm
} from '../../redux/actions'
import AccountDialog from './AccountDialog'

/**
 * AccountList
 *
 */
export default
class AccountList extends Component {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            store: props.store
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

        // Style
        const style = {
            margin: 12,
        };

        const {isFetching, accountArray} = store.getState().accounts;

        // Delete Handler
        const handleDeleteCharacter = id => {
            store.dispatch(requestData());
            // As a feeling, axios.delete ('/ api / accounts', {id})
            axios({
                method: 'delete',
                url: '/api/accounts',
                data: {
                    id,
                }
            })
                .then(response => {
                    const _accountArray = response.data;
                    store.dispatch(receiveDataSuccess(_accountArray));
                    // Initialize form after submit
                    store.dispatch(initializeForm());
                })
                .catch(err => {
                    console.error(new Error(err));
                    store.dispatch(receiveDataFailed());
                })
        };

        const handleRowSelection = selectedRow => {
            let selectedItem = accountArray[selectedRow];
            if (selectedItem === undefined)
                return;
            store.getState().form = selectedItem;
        };

        // Populate Rows
        let rows = _.map(accountArray, (item) => (
            <TableRow selected={item.selected} key={item._id}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.username}</TableRowColumn>
                <TableRowColumn>{item.password}</TableRowColumn>
                <TableRowColumn>{item.description}</TableRowColumn>
                <TableRowColumn>{item.url}</TableRowColumn>

                <TableRowColumn><AccountDialog store={store} mode={'Edit'}/></TableRowColumn>
                {/*
            <TableRowColumn><RaisedButton style={style} label="Edit" onClick={() => handleUpdateCharacter(item._id)}/></TableRowColumn>
            */}

                <TableRowColumn><RaisedButton style={style} label="Remove"
                                              onClick={() => handleDeleteCharacter(item._id)}/></TableRowColumn>
            </TableRow>
        ));

        // Retrun
        return (
            <div>
                {
                    isFetching  // Branch with the value of isFetching
                        ? <h2>Now Loading...</h2>  // Displaying loading icon if data is Fetch
                        : <div>
                            {/*
                        <RaisedButton primary={true} style={style} label="Fetch Data"
                                      onClick={() => handleFetchData()}/>
                        */}
                            <Table
                                onRowSelection={handleRowSelection}
                                selectable={true}
                                multiSelectable={false}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Username</TableHeaderColumn>
                                        <TableHeaderColumn>Password</TableHeaderColumn>
                                        <TableHeaderColumn>Description</TableHeaderColumn>
                                        <TableHeaderColumn>URL</TableHeaderColumn>
                                        <TableHeaderColumn></TableHeaderColumn>
                                        <TableHeaderColumn></TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows}
                                </TableBody>
                            </Table>
                        </div>
                }
            </div>
        )
    }

}
