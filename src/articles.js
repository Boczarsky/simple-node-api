const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getArticles).post(addArticle);

router.route('/:id').get(getArticle).delete(deleteArticle);

function getArticles(req, res) {
    res.status(200).send(storage.articles);
}

function getArticle(req, res) {
    const article = storage.articles.find((item) => item.id === parseInt(req.params.id));
    if(article) {
        res.status(200).send(article);
    }
    else {
        res.sendStatus(404);
    }
}

function addArticle(req, res) {
    const data = req.body;
    if(articleDataIsValid(data)) {
        const article = {};
        article.id = storage.articlesNextId++;
        article.header = data.header;
        article.content = data.content;
        storage.articles.push(article);
        res.sendStatus(201);
    }
    else {
        res.status(403).send({message: 'Invalid data'});
    }
}

function deleteArticle(req, res) {
    const index = storage.articles.findIndex((item) => item.id === parseInt(req.params.id));
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