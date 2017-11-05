/**
 * PageList.js
 *
 */
import React, {Component} from 'react';
import _ from 'lodash'
import SocketApi from '../../util/SocketApi';
import {pageDetailSelected, selectedItemPageReducer} from '../../redux/actions'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/**
 * PageList
 *
 */
export default
class PageList extends Component {

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

        const {isFetchingPage, pageArray} = this.state.store.getState().twopore;

        const handleRowSelection = selectedRow => {
            let selectedItem = pageArray[selectedRow];
            if (selectedItem === undefined)
                return;

            // Dispatch SelectedItem
            this.state.store.dispatch(pageDetailSelected(selectedItem));

            // Unsubscribe / Subscribe
            SocketApi.unsubscribePage();
            SocketApi.subscribePage(selectedItem);

            // Save selected item
            this.state.store.dispatch(selectedItemPageReducer(selectedItem));
        };

        // Populate Rows
        let rows = _.map(pageArray, (item) => (
            <TableRow
                selected={(item.pageid === this.state.store.getState().selectedPage.selectedItem.pageid)}
                key={item.pageid}>
                <TableRowColumn>{item.pageid}</TableRowColumn>
                <TableRowColumn>{item.title}</TableRowColumn>
                <TableRowColumn>{item.pagelanguage}</TableRowColumn>
                <TableRowColumn>{item.pagelanguagedir}</TableRowColumn>
                <TableRowColumn>{item.length}</TableRowColumn>
            </TableRow>
        ));

        // Retrun
        return (
            <div>
                {
                    isFetchingPage  // Branch with the value of isFetchingPage
                        ? <h2>Now Loading...</h2>  // Displaying loading icon if data is Fetch
                        : <div>
                            <Table
                                height={'300px'}
                                onRowSelection={handleRowSelection}
                                selectable={true}
                                multiSelectable={false}>
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Id</TableHeaderColumn>
                                        <TableHeaderColumn>Title</TableHeaderColumn>
                                        <TableHeaderColumn>Language</TableHeaderColumn>
                                        <TableHeaderColumn>Dir</TableHeaderColumn>
                                        <TableHeaderColumn>Length</TableHeaderColumn>
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
