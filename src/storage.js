const fs = require('fs');

const WipeOptions = {
    ALL: 'all',
    GALLERY: 'gallery',
    ARTICLES: 'articles',
    USERS: 'users'
}

async function wipeDataFromDatabase(wipeOptions) {
    let data;
    switch(wipeOptions) {
        case WipeOptions.ALL:
            data = {galleryNextId: 1, articlesNextId: 1, gallery: [], articles: [], users:[]}
            break;
        case WipeOptions.ARTICLES:
            data = await readFromDatabase();
            data.articles = [];
            break;
        case WipeOptions.GALLERY:
            data = await readFromDatabase();
            data.gallery = [];
            break;
        case WipeOptions.USERS:
            data = await readFromDatabase();
            data.users = [];
            break;
        default:
    }
    if(data) {
        const status = await writeToDatabase(data);
        if(status === 201) {
            return true;
        } 
        else {
            return false;
        }
    }
    return false;
}

function readFromDatabase() {
    return new Promise((resolve, reject) => {
        fs.readFile('src\\database.json', (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        })
    });
}

function writeToDatabase(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('src\\database.json', JSON.stringify(data), (err) => {
            if(err) {
                reject(err);
            } else {
                resolve(201)
            }
        })
    });
}

module.exports = {
    get: readFromDatabase,
    set: writeToDatabase,
    wipeData: wipeDataFromDatabase,
    WipeOptions
};