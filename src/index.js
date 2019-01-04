const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

const login = require('./login');
const register = require('./register');
const articles = require('./articles');
const gallery = require('./gallery');

const storage = require('./storage');

app.use(bodyParser.json());
app.use(cors());

app.use('/login', login);
app.use('/register', register);
app.use('/articles', articles);
app.use('/gallery', gallery);

app.post('/wipe', async (req, res) => {
    const option = req.query.option
    if(option) {
        const done = await storage.wipeData(option.toLowerCase())
        if(done) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
});

app.listen(port);