'use strict';

var fs = require('fs');
var _ = require('lodash');
var config = require('../config/config.json');
var uuid = require('uuid');

/**
 * TodoService
 *
 */
class CasesService {

    /**
     * constructor
     *
     * @param socket
     */
    constructor(socket) {

        // Socket
        this.socket = socket;

        // Model Name
        this.modelName = 'cases';
    }

    /**
     * getAll
     *
     */
    getAll(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Filter Result
        var data = modelObject;

        // Respnse
        res.jsonp(data);
    }

    /**
     * getById
     *
     */
    getById(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Respnse
        res.jsonp(data);
    }

    /**
     * updateById
     *
     */
    updateById(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Update Data
        var reqData = req.body;
        this.updateData(data, reqData);

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('update', data);
    }

    /**
     * create
     *
     */
    create(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Filter Result
        var data = {};

        // Update Data
        const nextId = uuid();
        var reqData = req.body;
        reqData.id = nextId;
        this.updateData(data, reqData);

        // Add new object into modelObject
        modelObject.push(data);

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('create', data);
    }

    /**
     * deleteById
     *
     */
    deleteById(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Parameters
        var id = req.params.id;

        // Filter Result
        var data = _.find(modelObject, {id:id});

        // Remove Object
        /* ES6
        modelObject = modelObject.filter(t => t.id !== id);
        */
        modelObject = modelObject.filter(function(element, index, array) {
            return (element.id !== id);
        });

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(data);

        // Event Object
        this.emitEvent('delete', data);
    }

    /**
     * deleteAll
     *
     */
    deleteAll(req, res) {
        // Get JSON Data
        var modelObject = this.getObject();

        // Remove All Object
        modelObject = [];

        // Write back to file
        this.writeFile(modelObject);

        // Respnse
        res.jsonp(null);

        // Event Object
        this.emitEvent('deleteAll', []);
    }

    /**
     * updateData
     *
     * @param data
     * @param reqData
     */
    updateData(data, reqData) {
        for (var p in reqData) {
            data[p] = reqData[p];
        }
    }

    /**
     * getObject
     *
     */
    getObject() {
        // Get JSON Data
        var file = fs.readFileSync(config.databaseFile);
        var json = JSON.parse(file);
        return json[this.modelName];
    }

    /**
     * writeFile
     *
     */
    writeFile(modelObject) {
        // Get JSON Data
        var file = fs.readFileSync(config.databaseFile);
        var json = JSON.parse(file);
        json[this.modelName] = modelObject;
        fs.writeFileSync(config.databaseFile, JSON.stringify(json, null, '\t'));
    }

    /**
     * emitEvent
     *
     */
    emitEvent(action, data) {
        // Event Object
        var res_object = {
            "model": this.modelName,
            "action": action,
            "item": data
        };

        // emit event
        this.socket.emit('eventData', res_object);

        // emit event for Redis
        this.socket.emit('MessageeRedis', res_object);
    }

}

module.exports = CasesService;