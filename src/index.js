const bodyParser = require('body-parser');
const express = require('express');
const articles = require('./articles');
const login = require('./login');
const gallery = require('./gallery');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/articles', articles);
app.use('/login', login);
app.use('/gallery', gallery)

app.listen(port);