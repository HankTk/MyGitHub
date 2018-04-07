import express = require('express');
import mongoose = require('mongoose');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import compression = require('compression');
import helmet = require('helmet');
import cors = require('cors');
import path = require('path');
import bodyParser = require('body-parser');
import jsonServer = require('json-server');

import socketio = require('./socket');

// Config
import config = require('../config/config.json');

// Routers
import authenticateRouter = require('./routers/authenticateRouter');
import CasesRouter from './routers/casesRouter';

/**
 * Server
 *
 */
class Server {

    // Create server for JSON Server
    public server = jsonServer;

    // JSON Database
    public router = jsonServer.router;

    // Cases Router
    public casesRouters: CasesRouter;

    /**
     * constructor
     *
     */
    constructor() {
        this.server = jsonServer.create();
        this.router = jsonServer.router(config.databaseFile);

        // Cases Router
        this.casesRouters = new CasesRouter(socketio);
        this.casesRouters.routes();

        // Config
        this.config();

        // Routers
        this.routes();
    }

    /**
     * config -.server.ication config
     *
     */
    public config(): void {

        // express middleware
        this.server.use(bodyParser.urlencoded({extended: true}));
        this.server.use(bodyParser.json());

        this.server.use(cookieParser());
        this.server.use(logger('dev'));
        this.server.use(compression());
        this.server.use(helmet());
        this.server.use(cors());

        // Set default middlewares (logger, static, cors and no-cache)
        this.server.use(jsonServer.defaults());

        // cors
        this.server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * routes -.server.ication routes
     *
     */
    public routes(): void {
        // Rewrite Resource
        this.server.use(jsonServer.rewriter({
            '/api/login':     '/simulate/login',
            '/api/cases':     '/simulate/cases',
            '/api/cases/:id': '/simulate/cases/:id'
        }));

        // Routers for Services
        this.server.use('/', authenticateRouter(this.server));
        this.server.use('/', this.casesRouters.router);

        // Resources /api
        this.server.use('/api', this.router);

        // Start REST API server with authentication
        this.server.use(this.router);
    }
}

// export
export default new Server().server;