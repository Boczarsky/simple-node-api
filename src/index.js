const bodyParser = require('body-parser');
const storage = require('./storage');
const express = require('express');
const cors = require('cors');
const btoa = require('btoa');
const app = express();
const port = 3000;

app.use( bodyParser.json() );
app.use(cors());

app.get('/articles', (req, res) => {
    res.send({articles: storage.articles});
});
app.post('/articles', (req, res) => {
    const data = req.body;
    if(articleDataIsValid(data)) {
        storage.articles.push(data)
        res.sendStatus(201);
    }
    else {
        res.status(403).send({message: 'Wrong data'});
    }
});
app.delete('/articles', (req, res) => {
    const index = storage.articles.findIndex((data) => {
        return data.title === req.body.title && data.url === req.body.url;
    });
    if(index !== -1){
        storage.articles.splice(index, 1);
        res.sendStatus(200);
    }
    else res.sendStatus(410);
});
function articleDataIsValid(data) {
    if(data) {
        return data.header && data.content;
    }
    else {
        return false;
    }
}
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === 'admin' && password === 'Admin1') {
        const token = btoa(username+password);
        res.status(200).send({token: token});
    }
    else {
        res.status(403).send({message: 'Wrong credentials you poor hacker'});
    }
})
app.get('/gallery', (req, res) => {
    res.send({images: storage.gallery});
});
app.post('/gallery', (req, res) => {
    const data = req.body;
    if(galleryDataIsValid(data)) {
        storage.gallery.push(data);
        res.sendStatus(201);
    } 
    else {
        res.status(403).send({message: 'Wrong data'})
    }
});
app.delete('/gallery', (req, res) => {
    const index = storage.gallery.findIndex((data) => {
        return data.title === req.body.title && data.url === req.body.url;
    });
    if(index !== -1){
        storage.gallery.splice(index, 1);
        res.sendStatus(200);
    }
    else res.sendStatus(410);

});
function galleryDataIsValid(data) {
    if(data) {
        return data.title && data.url;
    }
    else {
        return false;
    }
}
app.listen(port);