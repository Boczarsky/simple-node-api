const fs = require('fs');

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
    set: writeToDatabase
};