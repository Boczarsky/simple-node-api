const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').post(registrationHandler);

async function registrationHandler(req, res) {
    if(!isRegistrationDataValid(req.body)) {
        res.sendStatus(403).send({mesage: "Invalid data"});
    }
    else {
        const data = await storage.get();
        const userExist = data.users.includes( (item) => item.username === req.body.username );
        if(userExist) {
            res.sendStatus(403).send({message: "User already exist"});
        }
        else {
            const user = {};
            user.username = req.body.username;
            user.password = req.body.password;
            data.users.push(user);
            res.sendStatus(await storage.set(data));
        }
    }
}

function isRegistrationDataValid(data) {
    return data.username && data.password
}

module.exports = router;