/**
 * server.js
 *
 * @type {*}
 */

// Load necessary packages
var express = require('express'),
    app = express(),
    port = process.env.PORT || 9020,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Account = require('./api/models/accountModel');

// Connection to DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MyAccount');

// Description for receiving data in POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Preparation for using API server with express
var router = express.Router();
router.use(function(req, res, next) {
    /*
    console.log('Something is happening.');
    */
    next();
});

// Test whether it can be executed correctly or not (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

// Routing registration
var accountRoutes = require('./api/routes/accountRoutes');
accountRoutes(router);

// Routing registration
app.use('/api', router);

// Server Start
app.listen(port);
console.log('RESTful API server started on: ' + port);
