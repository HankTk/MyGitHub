import AuthService from "../services/authService";
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
    }

    /**
     * routes
     * set up our routes
     */
    public routes() {

        // Services
        const authServiceObj = new AuthService();

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