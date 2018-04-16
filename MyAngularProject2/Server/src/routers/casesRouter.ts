import {Request, Response, Router} from 'express';
import CasesSevice from '../services/casesService';

/**
 * TestRouter
 *
 */
export default class CasesRouter {

    public router: Router;

    /**
     * constructor
     *
     */
    constructor(private socketio: any) {
        this.router = Router();
        this.routes();
    }

    /**
     * routes
     * set up our routes
     */
    public routes() {

        // Services
        const casesServiceObj = new CasesSevice(this.socketio);

        this.router.get('/simulate/cases', function (req, res) {
            casesServiceObj.getAll(req, res);
        });

        this.router.get('/simulate/cases/:id', function (req, res) {
            casesServiceObj.getById(req, res);
        });

        this.router.put('/simulate/cases/:id', function (req, res) {
            casesServiceObj.updateById(req, res);
        });

        this.router.post('/simulate/cases', function (req, res) {
            casesServiceObj.create(req, res);
        });

        this.router.delete('/simulate/cases/:id', function (req, res) {
            casesServiceObj.deleteById(req, res);
        });

        this.router.delete('/simulate/cases', function (req, res) {
            casesServiceObj.deleteAll(req, res);
        });
    }

}
