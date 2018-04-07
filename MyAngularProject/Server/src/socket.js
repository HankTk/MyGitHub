/**
 * WebSocket Server
 */
const app = require('express')();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);

// Socket port
const socket_port = (process.env.SOCKET_PORT || 3050);

/**
 * Redis
 *
 * @type {adapter}
 */
const redis = require('socket.io-redis');
socketio.adapter(redis({host: 'localhost', port: 6379}));

/**
 * connection
 */
socketio.on('connection', onConnect);

/**
 * onConnect
 *
 * @param socket
 */
function onConnect(socket) {
    /**
     * Query
     */
    let query = socket.handshake.query;
    const hoge = query.hoge;

    /**
     * disconnect
     */
    socket.on('disconnect', onDisconnect);

    /**
     * Event Received
     */
    socket.on('MessageeRedis', onMessage);
}

/**
 * onDisconnect
 *
 */
function onDisconnect() {}

/**
 * onMessage
 *
 * @param data
 */
function onMessage(data) {
    // Emit Message
    socketio.sockets.emit('MessageeRedis', data);
    console.log('receive:', data);
}

/**
 * Server
 */
server.listen(socket_port, () => {
    console.log('Socket Server is listening on Port: ' + socket_port);
});

module.exports = socketio;