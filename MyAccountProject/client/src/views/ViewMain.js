/**
 * App.js
 *
 */
import React, {Component} from 'react'
import axios from 'axios'
import AccountList from './account/AccountList'
import AccountDialog from './account/AccountDialog'

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import { requestData, receiveDataSuccess, receiveDataFailed } from '../redux/actions'

/**
 * App
 *
 */
class ViewMain extends Component {

    getStyles() {
        return {
            appHeader: {
                display: 'flex',
                backgroundColor: '#5561ff',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '50px'
            },
            appBody: {
                display: 'flex',
                flexDirection: 'column',
                mergin: 20,
                backgroundColor: '#F5F5F5'
            }
        }
    }

    /**
     * componentDidMount
     *
     */
    componentDidMount() {

        let store = this.props.store;

        // Make isFetching true before calling axios.get()
        store.dispatch(requestData());

        // Get Data
        axios.get('/api/accounts')
            .then(response => {  // When receiving data successfully
                const _accountArray = response.data;
                // Save data to store and isFetching to false
                store.dispatch(receiveDataSuccess(_accountArray));
            })
            .catch(err => {  // When data reception fails
                console.error(new Error(err));
                // Change isFetching to false
                store.dispatch(receiveDataFailed());
            });
    }

    render() {

        let styles = this.getStyles();

        return (
            <div>
                <AppBar title="Account Manager"
                        style={styles.appHeader}>
                    <AccountDialog store={this.props.store} mode={'Add'}/>
                </AppBar>

                <Paper style={styles.appBody}>
                    <AccountList store={this.props.store}/>
                </Paper>

            </div>
        )
    }
}

// export
export default ViewMain