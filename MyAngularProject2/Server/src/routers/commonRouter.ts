import {Request, Response, Router} from 'express';
import CommonSevice, {default as CommonService} from '../services/commonService';

/**
 * CommonRouter
 *
 */
export default class CommonRouter {

    public router: Router;

    /**
     * constructor
     *
     */
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * routes
     * set up our routes
     */
    public routes() {

        // Services
        const commonServiceObj = new CommonService();

        this.router.get('/simulate/env', function (req, res) {
            commonServiceObj.getEnv(req, res);
        });

    }

}
