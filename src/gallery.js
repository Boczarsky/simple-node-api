const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getGallery).post(addToGallery).delete(deleteFromGallery);

function getGallery(req, res) {
    res.send({images: storage.gallery});
}

function addToGallery(req, res) {
    const data = req.body;
    if(galleryDataIsValid(data)) {
        storage.gallery.push(data);
        res.sendStatus(201);
    } 
    else {
        res.status(403).send({message: 'Wrong data'})
    }
}

function deleteFromGallery(req, res) {
    const index = storage.gallery.findIndex((data) => {
        return data.title === req.body.title && data.url === req.body.url;
    });
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