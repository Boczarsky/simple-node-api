const express = require('express');
const router = express.Router();
const storage = require('./storage');

router.route('/').get(getGallery).post(addToGallery);

router.route('/:id').get(getImage).delete(deleteFromGallery);

async function getGallery(req, res) {
    const data = await storage.get();
    res.status(200).send(data.gallery);
}

async function getImage(req, res) {
    const data = await storage.get();
    const image = data.gallery.find((item) => item.id === parseInt(req.params.id));
    if(image) {
        res.status(200).send(image);
    }
    else {
        res.sendStatus(404);
    }
}

async function addToGallery(req, res) {
    const data = await storage.get();
    const imageData = req.body;
    if(galleryDataIsValid(imageData)) {
        const image = {};
        image.id = data.galleryNextId++;
        image.header = imageData.header;
        image.content = imageData.content;
        data.gallery.push(image);
        res.sendStatus(await storage.set(data));
    } 
    else {
        res.status(403).send({message: 'Invalid data'})
    }
}

async function deleteFromGallery(req, res) {
    const data = await storage.get();
    const index = data.gallery.findIndex((item) => item.id === parseInt(req.params.id));
    if(index !== -1){
        data.gallery.splice(index, 1);
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

function galleryDataIsValid(data) {
    if(data) {
        return data.title && data.url;
    }
    else {
        return false;
    }
}

module.exports = router;