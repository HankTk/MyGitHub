/**
 * AccountDialog.js
 *
 */
import React from 'react'

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AccountForm from './AccountForm'

/**
 * AccountDialog
 *
 */
class AccountDialog extends React.Component {

    /**
     * Dialog State
     *
     * @type {{open: boolean}}
     */
    state = {
        open: false,
    };

    /**
     * getStyles
     *
     * @param model
     * @returns {{buttonStyle: {marginRight: number, marginBottom: number}}}
     */
    getStyles(model) {
        return {
            buttonStyle: {
                marginTop: 20,
                marginRight: 20
            }
        }
    }

    /**
     * handleOpen
     *
     */
    handleOpen = () => {
        this.setState({open: true});

        let store = this.props.store;
        if (this.props.mode === 'Add') {
            store.getState().form = {
                name: '',
                username: '',
                password: '',
                description: '',
                url: ''
            }
        }
    };

    /**
     * handleClose
     *
     */
    handleClose = () => {
        this.setState({open: false});
        console.log(this.context);
    };

    /**
     * componentWillMount
     *
     */
    componentWillMount() {
        /*
        let store = this.props.store;
        store.getState().form = this.props.selected;
        */
    }

    /**
     * Render
     *
     * @returns {XML}
     */
    render() {

        // Get Styles
        let styles = this.getStyles();

        // Prepare Action buttons
        const actions = [
            <RaisedButton
                key="btnCancel"
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={styles.buttonStyle}
            />,
            <RaisedButton
                key="btnSubmit"
                label="Submit"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
                style={styles.buttonStyle}
                type="submit"
            />,
        ];

        // Retrun
        return (
            <div>
                <RaisedButton label={`${this.props.mode} Account`} onTouchTap={this.handleOpen}/>
                <Dialog
                    title={`${this.props.mode} Account`}
                    /*
                    actions={actions}
                    */
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

                    <AccountForm
                        store={this.props.store}
                        actions={actions}
                        mode={this.props.mode}
                    />

                </Dialog>
            </div>
        );
    }
}

// export
export default AccountDialog
