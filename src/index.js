const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

const login = require('./login');
const register = require('./register');
const articles = require('./articles');
const gallery = require('./gallery');

app.use(bodyParser.json());
app.use(cors());

app.use('/login', login);
app.use('/register', register);
app.use('/articles', articles);
app.use('/gallery', gallery);

app.listen(port);