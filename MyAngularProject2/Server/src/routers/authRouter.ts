import AuthService from "../services/authService";
import CommonService from "../services/commonService";
import {Router} from "express";

/**
 * TestRouter
 *
 */
export default class AuthRouter {

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
        const authServiceObj = new AuthService();
        const commomServiceObj = new CommonService();

        // Env
        this.router.get('/simulate/env', function (req, res) {
            commomServiceObj.getEnv(req, res);
        });

        // Login
        this.router.post('/simulate/login', function (req, res) {
            authServiceObj.login(req, res);
        });

        // Verification
        this.router.use(/^(?!\/simulate\/login).*$/, (req, res, next) => {
            authServiceObj.verify(req, res, next);
        });
    }

}