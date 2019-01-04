const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').post(registrationHandler);

async function registrationHandler(req, res) {
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

module.exports = router;