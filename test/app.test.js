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

    let project2 = {
        name: 'felted bunny',
        materials: ['needles', 'wool', 'felting block'],
    };

    it('saves a project to database with post', () => {
        return chai.request(app)
            .post('/projects')
            .send(project)
            .then(({ body }) => {
                assert.deepEqual(body.name, project.name);
            });
    });

    it('gets projects when requested', () => {
        return chai.request(app)
            .get('/projects')
            .then(({ body }) => {
                assert.deepEqual(body[0].name, project.name);
                assert.deepEqual(body[0].budget, project.budget);
            });
    });

    after(() => mongo.client.close());
});