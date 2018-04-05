const express = require('express');
const fs = require('fs');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

// Word for create signature and expires(1 Hour)
const SECRET_WORD = 'SECRET1234';
const expiresIn = '1h';

// create signature
const createToken = payload => jwt.sign(payload, SECRET_WORD, {expiresIn});

// verify signature (async)
const verifyToken = token =>
new Promise((resolve, reject) =>
jwt.verify(token, SECRET_WORD, (err, decode) => decode !== undefined ? resolve(decode) : reject(err)));

// Load User DB faile
const userdb = JSON.parse(fs.readFileSync(config.usersFile, 'UTF-8'));

// Login Function, true:ok false:ng
const isAuth = ({username, password}) => userdb.users.findIndex(user => user.username === username && user.password === password) !== -1;


// Export router module
module.exports = function (server) {

    var router = express.Router();

    // Login Router
    server.post('/simulate/login', (req, res) => {

        const {username, password} = req.body;

        // Verify Login
        if (isAuth({username, password}) === false) {
            const status = 401;
            const message = 'Incorrect username or password';
            res.status(status).json({status, message});
            return;
        }

        // Issue token, when login success
        const access_token = createToken({username, password});
        res.status(200).json({access_token});
    });

    // Authentication requied router (all, except login)
    server.use(/^(?!\/simulate\/login).*$/, async(req, res, next) => {

        // Authentication header, verify format
        if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            const status = 401;
            const message = 'Error in authorization format';
            res.status(status).json({status, message});
            return
        }

        // Verify Authentication token
        try {
            await
            verifyToken(req.headers.authorization.split(' ')[1]);
            next();
        } catch (err) {
            // When Authentication token has expired
            const status = 401;
            const message = 'Error access_token is revoked';
            res.status(status).json({status, message});
        }
    });

    return router;

};
