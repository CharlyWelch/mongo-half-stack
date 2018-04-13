require('dotenv').config({ path: '../.env.test' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');
chai.use(chaiHttp);
const { assert } = chai;

describe('Projects Database', () => {
    before(() => {
        return mongo.then(db => {
            db.collection('projects').remove();
        });
    });

    let project = {
        name: 'bathroom remodel',
        timeline: '6 weeks',
        budget: 5000
    };

    it('saves a project to database', () => {
        return chai.request(app)
            .post('/projects')
            .send(project)
            .then(({ body }) => {
                assert.deepEqual(body, [project]);
            });
    });
});