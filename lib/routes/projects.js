const notFound = require('./not-found');
const project = require('../models/project');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    project.selectOne(id)
        .then(proj => {
            res.send(proj);
        });
};

const getAll = (req, res) => {
    project.find().then(projects => {
        res.send(projects);
    });
};

const post = (req, res) => {
    project.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};