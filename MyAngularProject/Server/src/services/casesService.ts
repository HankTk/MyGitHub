'use strict';

import {Request, Response, Router} from 'express';
import fs from 'fs';
import uuid from 'uuid';
import _ from 'lodash';
const config = require('../../config/config.json');

/**
 * TodoService
 *
 */
export default
class CasesService {

    private socket: any;

    // Model Name
    private modelName = 'cases';

    /**
     * constructor
     *
     * @param socket
     */
    constructor(socket:any) {

        // Socket
        this.socket = socket;
    }

    /**
     * getAll
     *
     */
    getAll(req: Request, res: Response) {
        // Get JSON Data
        const modelObject = this.getObject();

        // Filter Result
        const data = modelObject;

        // Respnse
        res.jsonp(data);
    }

    /**
     * getById
     *
     */
    getById(req: Request, res: Response) {
        // Get JSON Data
        const modelObject = this.getObject();

        // Parameters
        const id = req.params.id;

        // Filter Result
        const data = _.find(modelObject, {id:id});

        // Respnse
        res.jsonp(data);
    }

    /**
     * updateById
     *
     */
    updateById(req: Request, res: Response) {
        // Get JSON Data
        let modelObject = this.getObject();

        // Parameters
        const id = req.params.id;

        // Filter Result
        const data = _.find(modelObject, {id:id});

        // Update Data
        const reqData = req.body;
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
    create(req: Request, res: Response) {
        // Get JSON Data
        const modelObject = this.getObject();

        // Filter Result
        let data = {};

        // Update Data
        const nextId = uuid();
        const reqData = req.body;
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
    deleteById(req: Request, res: Response) {
        // Get JSON Data
        let modelObject = this.getObject();

        // Parameters
        const id = req.params.id;

        // Filter Result
        const data = _.find(modelObject, {id:id});

        // Remove Object
        /* ES6
        modelObject = modelObject.filter(t => t.id !== id);
        */
        modelObject = modelObject.filter(function(element: any, index: any, array: any) {
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
    deleteAll(req: Request, res: Response) {
        // Get JSON Data
        let modelObject = this.getObject();

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
    updateData(data:any, reqData:any) {
        for (let p in reqData) {
            data[p] = reqData[p];
        }
    }

    /**
     * getObject
     *
     */
    getObject() {
        // Get JSON Data
        const file = fs.readFileSync(config.databaseFile);
        const json = JSON.parse(file);
        return json[this.modelName];
    }

    /**
     * writeFile
     *
     */
    writeFile(modelObject: any) {
        // Get JSON Data
        const file = fs.readFileSync(config.databaseFile);
        const json = JSON.parse(file);
        json[this.modelName] = modelObject;
        fs.writeFileSync(config.databaseFile, JSON.stringify(json, null, '\t'));
    }

    /**
     * emitEvent
     *
     */
    emitEvent(action: any, data: any) {
        // Event Object
        const res_object = {
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
