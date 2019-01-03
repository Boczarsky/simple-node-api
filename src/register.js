const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').post(registrationHandler);

function registrationHandler(req, res) {
    const userExist = storage.users.includes( (item) => item.username === req.body.username );
    if(userExist) {
        res.sendStatus(403).send({message: "User already exist"});
    }
    else {
        const user = {};
        user.username = req.body.username;
        user.password = req.body.password;
        storage.users.push(user);
        res.sendStatus(201);
    }
}

module.exports = router;