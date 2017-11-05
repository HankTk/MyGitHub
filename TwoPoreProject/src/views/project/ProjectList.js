/**
 * ProjectList.js
 *
 */
import React, {Component} from 'react';
import _ from 'lodash'
import SocketApi from '../../util/SocketApi';
import {selectedItemProjectReducer, requestDataPage, pageDetailSelected} from '../../redux/actions'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/**
 * ProjectList
 *
 * @param store
 * @returns {XML}
 * @constructor
 */
export default
class ProjectList extends Component {

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

        const {isFetchingProject, projectArray} = this.state.store.getState().twopore;

        const handleRowSelection = selectedRow => {
            let selectedItem = projectArray[selectedRow];
            if (selectedItem === undefined)
                return;

            // Make isFetchingPage true before
            this.state.store.dispatch(requestDataPage());

            // Project Selected, get pages
            SocketApi.getProjectPages(selectedItem);

            // Unsubscribe / Subscribe
            SocketApi.unsubscribeProject();
            SocketApi.subscribeProject(selectedItem);

            // Save selected item
            this.state.store.dispatch(selectedItemProjectReducer(selectedItem));

            // Dispatch SelectedItem
            this.state.store.dispatch(pageDetailSelected(''));
        };

        // Populate Rows
        let rows = _.map(projectArray, (item) => (
            <TableRow
                selected={(item.name === this.state.store.getState().selectedProject.selectedItem.name)}
                key={item.id}>
                <TableRowColumn>{item.name}</TableRowColumn>
            </TableRow>
        ));

        // Retrun
        return (
            <div style={{height: 500}}>
                {
                    isFetchingProject  // Branch with the value of isFetchingProject
                        ? <h2>Now Loading...</h2>  // Displaying loading icon if data is Fetch
                        : <div>
                            <Table
                                height={'500px'}
                                onRowSelection={handleRowSelection}
                                selectable={true}
                                multiSelectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Project Name</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows}
                                </TableBody>
                            </Table>
                        </div>
                }
            </div>
        );
    }

};
