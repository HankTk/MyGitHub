/**
 * accountModel
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: {
        type: String,
        Required: 'Enter the name of the account'
    },
    username: {
        type: String,
        Required: 'Enter the username of the account'
    },
    password: {
        type: String,
        Required: 'Enter the password of the account'
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'disabled', 'closed']
        }],
        default: ['active']
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Accounts', AccountSchema);
