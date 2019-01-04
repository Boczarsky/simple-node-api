const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getArticles).post(addArticle);

router.route('/:id').get(getArticle).delete(deleteArticle);

async function getArticles(req, res) {
    const data = await storage.get();
    res.status(200).send(data.articles);
}

async function getArticle(req, res) {
    const data = await storage.get();
    const article = data.articles.find((item) => item.id === parseInt(req.params.id));
    if(article) {
        res.status(200).send(article);
    }
    else {
        res.sendStatus(404);
    }
}

async function addArticle(req, res) {
    const data = await storage.get();
    const articleData = req.body;
    if(articleDataIsValid(articleData)) {
        const article = {};
        article.id = data.articlesNextId++;
        article.header = articleData.header;
        article.content = articleData.content;
        data.articles.push(article);
        res.sendStatus(await storage.set(data));
    }
    else {
        res.status(403).send({message: 'Invalid data'});
    }
}

async function deleteArticle(req, res) {
    const data = await storage.get();
    const index = data.articles.findIndex((item) => item.id === parseInt(req.params.id));
    if(index !== -1){
        data.articles.splice(index, 1);
        const status = await storage.set(data);
        if(status === 201) {
            res.sendStatus(200);
        }
        else {
            console.error(status);
            res.sendStatus(500);
        }
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