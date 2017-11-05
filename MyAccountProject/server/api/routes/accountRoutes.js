/**
 * accountRoutes
 */
'use strict';

module.exports = function (router) {

    let accountController = require('../controllers/accountController');

    // Account Routes
    router.route('/accounts')
        .get(accountController.readAll)
        .post(accountController.create)

        .put(accountController.findByIdAndUpdate)
        .delete(accountController.findByIdAndRemove);

    // Account Routes with id
    router.route('/accounts/:id')
        .get(accountController.read)
        .put(accountController.update)
        .delete(accountController.destroy);

};
