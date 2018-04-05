const express = require('express');
const casesService = require('../services/casesService');

// Export router module
module.exports = function (socketio) {

    const router = express.Router();

    // Services
    const casesServiceObj = new casesService(socketio);

    router.get('/simulate/cases', function (req, res) {
        casesServiceObj.getAll(req, res);
    });

    router.get('/simulate/cases/:id', function (req, res) {
        casesServiceObj.getById(req, res);
    });

    router.put('/simulate/cases/:id', function (req, res) {
        casesServiceObj.updateById(req, res);
    });

    router.post('/simulate/cases', function (req, res) {
        casesServiceObj.create(req, res);
    });

    router.delete('/simulate/cases/:id', function (req, res) {
        casesServiceObj.deleteById(req, res);
    });

    router.delete('/simulate/cases', function (req, res) {
        casesServiceObj.deleteAll(req, res);
    });

    return router;
};
