const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getArticles).post(addArticle).delete(deleteArticle);

function getArticles(req, res) {
    res.send({articles: storage.articles});
}

function addArticle(req, res) {
    const data = req.body;
    if(articleDataIsValid(data)) {
        storage.articles.push(data)
        res.sendStatus(201);
    }
    else {
        res.status(403).send({message: 'Wrong data'});
    }
}

function deleteArticle(req, res) {
    const index = storage.articles.findIndex((data) => {
        return data.title === req.body.title && data.url === req.body.url;
    });
    if(index !== -1){
        storage.articles.splice(index, 1);
        res.sendStatus(200);
    }
    else res.sendStatus(410);
}

function articleDataIsValid(data) {
    if(data) {
        return data.header && data.content;
    }
    else {
        return false;
    }
}

module.exports = router;