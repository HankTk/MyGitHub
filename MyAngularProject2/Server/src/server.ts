import {Request, Response, Router} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonServer from 'json-server';

// Routers
import AuthRouter from './routers/authRouter';
import CasesRouter from './routers/casesRouter';

// Socket
const socketio = require('./socket');

// Config
const config = require('../config/config.json');

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

    // Auth Router
    public authRouters: AuthRouter;

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

        // Auth Router
        this.authRouters = new AuthRouter();
        this.authRouters.routes();

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
        this.server.use((req: Request, res: Response, next: any) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * routes - api / authentication routes
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
        this.server.use('/', this.authRouters.router);
        this.server.use('/', this.casesRouters.router);

        // Resources /api
        this.server.use('/api', this.router);

        // Start REST API server with authentication
        this.server.use(this.router);
    }
}

// export
export default new Server().server;