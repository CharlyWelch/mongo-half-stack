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
        timeline: '1 week',
        budget: 20
    };

    before(() => {
        return chai.request(app)
            .post('/projects')
            .send(project)
            .then(({ body }) => {
                project = body;
            });
    });

    it('saves a project to database with post, adds _id', () => {
        assert.ok(project._id);
    });
    
    it('gets a project by id', () => {
        return chai.request(app)
            .get(`/projects/${project._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, project);
            });
    });
    
    it('gets all projects', () => {
        return chai.request(app)
            .post('/projects')
            .send(project2)
            .then(({ body }) => {
                project2 = body;
                return chai.request(app)
                    .get('/projects')
                    .then(({ body }) => {
                        assert.deepEqual(body, [project, project2]);
                    });
            });
    });
    
    it('updates a project', () => {
        project.budget = 4500;
        return chai.request(app)
            .put(`/projects/${project._id}`)
            .send(project)
            .then(() => {
                return chai.request(app)
                    .get(`/projects/${project._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, project);
                    });
            });
    });
    it('deletes a project by id', () => {
        return chai.request(app)

    });


    after(() => mongo.client.close());
});