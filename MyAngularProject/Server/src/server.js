// Module Reference
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const socketio = require('./socket');
const config = require('../config/config.json');
const _ = require('lodash');

// Application port
const app_port = (process.env.APP_PORT || 3000);

// Create server for JSON Server
const server = jsonServer.create();

// JSON Database
const router = jsonServer.router(config.databaseFile);

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// JSON Request bodyParser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Rewrite Resource
server.use(jsonServer.rewriter({
    '/api/login':     '/simulate/login',
    '/api/cases':     '/simulate/cases',
    '/api/cases/:id': '/simulate/cases/:id'
}));

// Routers for Services
server.use('/', require('../routers/authenticateRouter')(server));
server.use('/', require('../routers/casesRouter')(socketio));

// Resources /api
server.use('/api', router);

// Start REST API server with authentication
server.use(router);

// Listen
server.listen(app_port, () => {
    console.log('  JSON Server is listening on Port: ' + app_port);
    console.log('  with Authentication');
});
