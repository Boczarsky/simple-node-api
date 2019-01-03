const express = require('express');
const router = express.Router();
const btoa = require('btoa');

router.route('/').post(loginHandler);

function loginHandler(req, res){
    const username = req.body.username;
    const password = req.body.password;
    if(username === 'admin' && password === 'Admin1') {
        const token = btoa(username+password);
        res.status(200).send({token: token});
    }
    else {
        res.status(403).send({message: 'Wrong credentials you poor hacker'});
    }
}

module.exports = router;