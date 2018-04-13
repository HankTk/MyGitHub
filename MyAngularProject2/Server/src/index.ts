import debug = require('debug');
import http = require('http');

import Server from './server';

debug('ts-express:server');

// Application port
const app_port = normalizePort(process.env.APP_PORT || 3000);
Server.set('port', app_port);
console.log(`Server listening on port ${app_port}`);

/**
 * createServer
 *
 * @type {"http".Server}
 */
const server = http.createServer(Server);
server.listen(app_port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * normalizePort
 *
 * @param {number | string} val
 * @returns {number | string | boolean}
 */
function normalizePort(val: number | string): number | string | boolean {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}

/**
 * onError
 *
 * @param {NodeJS.ErrnoException} error
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof app_port === 'string') ? 'Pipe ' + app_port : 'Port ' + app_port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * onListening
 *
 */
function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
