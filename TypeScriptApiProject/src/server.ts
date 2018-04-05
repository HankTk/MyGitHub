import express = require('express');
import mongoose = require('mongoose');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import compression = require('compression');
import helmet = require('helmet');
import cors = require('cors');
import path = require('path');
import bodyParser = require('body-parser');

// Routers
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';

/**
 * Server
 *
 */
class Server {

    // set app to be of type express.Application
    public app: express.Application;

    /**
     * constructor
     *
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    /**
     * config - application config
     *
     */
    public config(): void {

        const MONGO_URI: string = 'mongodb://localhost/MyUser';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        // express middleware
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

    }

    /**
     * routes - application routes
     *
     */
    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
    }
}

// export
export default new Server().app;