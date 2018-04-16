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

    before(() => {
        return chai.request(app)
            .post('/projects')
            .send(project)
            .then(({ body }) => {
                project = body;
            });
    });

    it('saves a project to database with post and adds _id', () => {
        return chai.request(app)
            .post('/projects')
            .send(project)
            .then(({ body }) => {
                assert.deepEqual(body.name, project.name);
                assert.ok(body._id);
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

    it('gets a project by id', () => {
        return chai.request(app)
            .get(`/projects/${project._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, project);
            });
    });

    after(() => mongo.client.close());
});