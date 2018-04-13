const notFound = require('./not-found');
const project = require('../models/project');

const get = (req, res) => {
    console.log('get it');
};

const post = (req, res) => {
    project.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { get, post }

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};