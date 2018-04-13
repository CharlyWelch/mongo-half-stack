const mongo = require('../mongodb');

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
                .toArray();
        });
    }
};