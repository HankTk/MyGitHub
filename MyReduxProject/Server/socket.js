/**
 * WebSocket Server
 */
const app = require('express')();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);

/**
 * connection
 */
socketio.on('connection', (socket) => {

    /**
     * Query
     */
    let query = socket.handshake.query;
    const hoge = query.hoge;

    /**
    * disconnect
    */
    socket.on('disconnect', function () {
    });

    /**
     * Event Received
     */
    socket.on('model_send', (data) => {

        // model_todo
        socketio.emit('model_todo', {data: data});
        console.log('Server: ', data);
    });

});

/**
 * Server
 */
server.listen(3050, () => {
    console.log('Socket Server is running');
});

module.exports = socketio;