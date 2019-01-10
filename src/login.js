const express = require('express');
const router = express.Router();
const btoa = require('btoa');
const storage = require('./storage');

router.route('/').post(loginHandler);

async function loginHandler(req, res){
    const username = req.body.username;
    const password = req.body.password;
    if(await userIsValid(username, password)) {
        const token = btoa(username+password);
        res.status(200).send({token: token});
    }
    else {
        res.status(403).send({message: 'Wrong credentials you poor hacker'});
    }
}

async function userIsValid(username, password) {
    const data = await storage.get();
    const users = data.users;
    return users.some((item) => item.username === username && item.password === password)
}

module.exports = router;