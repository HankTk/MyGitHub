/**
 * JSON Server
 * https://github.com/typicode/json-server/issues/518
 */
var jsonServer = require('json-server');
var server = jsonServer.create();
var cors = require('cors');
var _ = require('lodash');
var socketio = require('./socket');
var config = require('./config.json');

// Services
var TodoService =  require('./services/todoService');
var todoServiceObj = new TodoService(socketio);

// use it before all route definitions
/*
server.use(cors({origin: 'http://localhost:4200'}));
*/
server.use(cors());

// Rewrite Resource
server.use(jsonServer.rewriter({
    '/api/todo':     '/simulate/todo',
    '/api/todo/:id': '/simulate/todo/:id'
}));

// JSON Database
var router = jsonServer.router(config.databaseFile);
var middlewares = jsonServer.defaults();

// Resources
server.use('/api', router);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
    /*
    console.log('get requested. params check');
    */
    next()
});

// todoService
server.get('/simulate/todo',        function (req, res) {todoServiceObj.getAll(req, res);});
server.get('/simulate/todo/:id',    function (req, res) {todoServiceObj.getById(req, res);});
server.put('/simulate/todo/:id',    function (req, res) {todoServiceObj.updateById(req, res);});
server.post('/simulate/todo',       function (req, res) {todoServiceObj.create(req, res);});
server.delete('/simulate/todo/:id', function (req, res) {todoServiceObj.deleteById(req, res);});
server.delete('/simulate/todo',     function (req, res) {todoServiceObj.deleteAll(req, res);});

// Listen
server.listen(3000, function () {
    console.log('JSON Server is running')
});
