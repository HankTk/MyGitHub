/**
 * accountController
 */
'use strict';

let mongoose = require('mongoose'),
    Account = mongoose.model('Accounts');

/**
 * readAll
 *
 * @param req
 * @param res
 */
exports.readAll = function (req, res) {
    Account.find({}, function (err, result) {
        if (err)
            res.send(err);
        res.json(result);
    });
};

/**
 * create
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    let item = new Account(req.body);
    item.save(function (err, result) {
        if (err)
            res.send(err);
        /*
        res.json(result);
        */
        Account.find({}, (findErr, characterArray) => {
            if (findErr) {
                res.status(500).send()
            }
            else {
                res.status(200).send(characterArray)
            }
        })
    });
};

/**
 * read
 *
 * @param req
 * @param res
 */
exports.read = function (req, res) {
    Account.findById(req.params.id, function (err, result) {
        if (err)
            res.send(err);
        res.json(result);
    });
};

/**
 * update
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
    let condition = {_id: req.params.id};
    Account.findOneAndUpdate(condition, req.body, {new: true}, function (err, result) {
        /*
        if (err)
            res.send(err);
        res.json(result);
        */
        if (err) {
            response.status(500).send()
        }
        else {
            Account.find({}, (findErr, characterArray) => {
                if (findErr) {
                    res.status(500).send()
                }
                else {
                    res.status(200).send(characterArray)
                }
            })
        }

    });
};

/**
 * destroy
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
    Account.remove({_id: req.params.id}, function (err, result) {
        if (err)
            res.send(err);
        res.json({message: 'Successfully deleted'});
    });
};

/**
 * findByIdAndUpdate
 *
 * @param req
 * @param res
 */
exports.findByIdAndUpdate = function (req, res) {
    const {id} = req.body;
    Account.findByIdAndUpdate(id, { $inc: {"age": 1} }, err => {
        if (err) {
            response.status(500).send()
        }
        else {
            Account.find({}, (findErr, characterArray) => {
                if (findErr) {
                    res.status(500).send()
                }
                else {
                    res.status(200).send(characterArray)
                }
            })
        }
    });
};

/**
 * findByIdAndRemove
 *
 * @param req
 * @param res
 */
exports.findByIdAndRemove = function (req, res) {
    const {id} = req.body;
    Account.findByIdAndRemove(id, err => {
        if (err) {
            response.status(500).send()
        }
        else {
            Account.find({}, (findErr, characterArray) => {
                if (findErr) {
                    res.status(500).send()
                }
                else {
                    res.status(200).send(characterArray)
                }
            })
        }
    });
};
