/**
 * PageList.js
 *
 */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

/**
 * PageDetail
 *
 * @param store
 * @returns {XML}
 * @constructor
 */
export default
class PageDetail extends Component {

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

        const {pageData} = this.state.store.getState().twopore;

        // Selected Page
        let selectedPage = (
            (pageData) ?
                <pre>
            {JSON.stringify(pageData, undefined, 2)}
        </pre> : ''

        );

        // Retrun
        return (
            <div>
                <Paper style={{margin: 5, height: 200, overflowY: 'auto'}}>
                    {selectedPage}
                </Paper>

            </div>
        );
    }

};
