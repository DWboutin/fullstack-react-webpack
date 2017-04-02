//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import User from '../src/server/models/User.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  let createdId;

  // Before the tests we empty the database
  before((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/GET /users/find', () => {
    it('it should GET all users, but no results', (done) => {
      chai.request(server)
        .get('/users/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /users/create', () => {
    it('it should create a new user called "Mike"', (done) => {
      const user = {
        name: 'Mike',
      };

      chai.request(server)
        .post('/users/create')
        .send(user)
        .end((err, res) => {
          createdId = res.body._id;

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Mike');
          done();
        });
    });
  });

  describe('/PUT /users/update/:id', () => {
    it('it should update "Mike" to set a his name to "Mikael"', (done) => {
      chai.request(server)
        .put(`/users/update/${createdId}`)
        .send({
          name: 'Mikael'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Mikael');
          done();
        });
    });
  });

  describe('/GET /users/find', () => {
    it('it should GET the user with the new name "Mikael"', (done) => {
      chai.request(server)
        .get('/users/find')
        .query({
          name: 'Mikael',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('_id').eql(createdId);
          res.body[0].should.have.property('name').eql('Mikael');
          done();
        });
    });
  });

  describe('/POST /users/delete/:id', () => {
    it('it should delete user "Mikael"', (done) => {
      chai.request(server)
        .post(`/users/delete/${createdId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(createdId);
          done();
        });
    });
  });

  describe('/GET /users/find', () => {
    it(`it should not find any user`, (done) => {
      chai.request(server)
        .get('/users/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

