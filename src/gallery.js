const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getGallery).post(addToGallery);

router.route('/:id').get(getImage).delete(deleteFromGallery);

function getGallery(req, res) {
    res.status(200).send(storage.gallery);
}

function getImage(req, res) {
    const image = storage.gallery.find((item) => item.id === parseInt(req.params.id));
    if(image) {
        res.status(200).send(image);
    }
    else {
        res.sendStatus(404);
    }
}

function addToGallery(req, res) {
    const data = req.body;
    if(galleryDataIsValid(data)) {
        const gallery = {};
        gallery.id = storage.galleryNextId++;
        gallery.header = data.header;
        gallery.content = data.content;
        storage.gallery.push(gallery);
        res.sendStatus(201);
    } 
    else {
        res.status(403).send({message: 'Invalid data'})
    }
}

function deleteFromGallery(req, res) {
    const index = storage.gallery.findIndex((item) => item.id === parseInt(req.params.id));
    if(index !== -1){
        storage.gallery.splice(index, 1);
        res.sendStatus(200);
    }
    else res.sendStatus(410);
}

function galleryDataIsValid(data) {
    if(data) {
        return data.title && data.url;
    }
    else {
        return false;
    }
}

module.exports = router;