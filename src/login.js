const express = require('express');
const router = express.Router();
const btoa = require('btoa');

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
    return username === 'admin' && password === 'Admin1'
}

module.exports = router;