const mongo = require('../mongodb');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    insert(project) {
        return mongo.then(db => {
            return db.collection('projects')
                .insert(project)
                .then(result => result.ops[0]);
        });
    },

    find() {
        return mongo.then(db => { 
            return db.collection('projects')
                .find()
                .toArray()
                .then(result => {
                    return result;
                });
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('projects')
                .findOne({ _id: ObjectId(id) })
                .then(result => {
                    return result;
                });
        });
    }
};