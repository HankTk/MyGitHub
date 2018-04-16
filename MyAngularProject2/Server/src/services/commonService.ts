'use strict';

import {Request, Response, Router} from 'express';

/**
 * CommonService
 *
 */
export default
class CommonService {

    /**
     * constructor
     *
     */
    constructor() {
    }

    /**
     * getAll
     *
     */
    getEnv(req: Request, res: Response) {
        const data = {
            'data': 'shore'
        };
        // Respnse
        res.jsonp(data);
    }
}
