/**
 * ViewMain.js
 *
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SocketApi from '../util/SocketApi';
import {requestDataProject} from '../redux/actions'
import ProjectList from './project/ProjectList';
import PageList from './project/PageList';
import PageDetail from './project/PageDetail';

import {Row, Col} from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

/**
 * ViewMain
 *
 */
export default
class ViewMain extends Component {

    /**
     * getStyles
     *
     * @returns {{appHeader: {display: string, backgroundColor: string, justifyContent: string, alignItems: string}}}
     */
    getStyles() {
        return {
            appHeader: {
                display: 'flex',
                backgroundColor: '#5561ff',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }
    }

    /**
     * componentDidMount
     *
     */
    componentDidMount() {

        let store = this.props.store;

        // Make isFetchingProject true before
        store.dispatch(requestDataProject());

        // Socket Open & Get Project
        SocketApi.openWebSocket(store);
    }

    /**
     * render
     *
     * @returns {XML}
     */
    render() {

        let styles = this.getStyles();

        return (
            <div>
                <AppBar title="Project List"
                        style={styles.appHeader}>
                </AppBar>

                <Row>
                    <Col span={4}>
                        <Paper style={{margin: 5}}>
                            <ProjectList store={this.props.store}/>
                        </Paper>
                    </Col>
                    <Col span={8}>
                        <Paper style={{margin: 5}}>
                            <PageList store={this.props.store}/>
                        </Paper>
                        <PageDetail store={this.props.store}/>
                    </Col>
                </Row>
            </div>
        )
    }

}
