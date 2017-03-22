//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import Location from '../src/server/models/Location.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Locations', () => {
  let createdId;

  // Before the tests we empty the database
  before((done) => {
    Location.remove({}, (err) => {
      done();
    });
  });

  describe('/GET /locations/find', () => {
    it('it should GET all locations, but no results', (done) => {
      chai.request(server)
        .get('/locations/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /locations/create', () => {
    it('it should create a new location called "Québec"', (done) => {
      const location = {
        name: 'Québec',
        country: 'CA',
      };

      chai.request(server)
        .post('/locations/create')
        .send(location)
        .end((err, res) => {
          createdId = res.body._id;

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Québec');
          res.body.should.have.property('country').eql('CA');
          done();
        });
    });
  });

  describe('/PUT /locations/update/:id', () => {
    it('it should update "Québec" to set it name to "Montréal"', (done) => {
      chai.request(server)
        .put(`/locations/update/${createdId}`)
        .send({
          name: 'Montréal'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Montréal');
          res.body.should.have.property('country').eql('CA');
          done();
        });
    });
  });

  describe('/GET /locations/find', () => {
    it(`it should GET all locations with renamed location "Montréal"`, (done) => {
      chai.request(server)
        .get('/locations/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('_id').eql(createdId);
          res.body[0].should.have.property('name').eql('Montréal');
          res.body[0].should.have.property('country').eql('CA');
          done();
        });
    });
  });

  describe('/POST /locations/create', () => {
    it('it should NOT create a new location with the same name and country', (done) => {
      const location = {
        name: 'Montréal',
        country: 'CA',
      };

      chai.request(server)
        .post('/locations/create')
        .send(location)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('Location already exists for this name and country');
          done();
        });
    });
  });

  describe('/POST /locations/delete/:id', () => {
    it('it should delete "Montréal"', (done) => {
      chai.request(server)
        .post(`/locations/delete/${createdId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(createdId);
          done();
        });
    });
  });

  describe('/GET /locations/find', () => {
    it(`it should not find any locations`, (done) => {
      chai.request(server)
        .get('/locations/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

