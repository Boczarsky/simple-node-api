const express = require('express');
const router = express.Router();
const btoa = require('btoa');
const storage = require('./storage');

router.route('/').post(loginHandler);

function loginHandler(req, res){
    const username = req.body.username;
    const password = req.body.password;
    if(userIsValid(username, password)) {
        const token = btoa(username+password);
        res.status(200).send({token: token});
    }
    else {
        res.status(403).send({message: 'Wrong credentials you poor hacker'});
    }
}

function userIsValid(username, password) {
    return storage.users.includes((item) => item.username === username && item.password === password)
}

module.exports = router;