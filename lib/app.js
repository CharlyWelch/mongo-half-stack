const { parse } = require('url');
const projects = require('./routes/projects');
const notfound = require('./routes/not-found');
const bodyParser = require('./body-parser');
const { createReadStream } = require('fs');

const routes = {
    __proto__: null,
    projects
};

module.exports = (req, res) => {
    if(req.url === '/' && req.method == 'GET') {
        return createReadStream(`${__dirname}/index.html`)
            .pipe(res);
    }
}