//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import Drug from '../src/server/models/Drug.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Drugs', () => {
  let createdId;

  // Before the tests we empty the database
  before((done) => {
    Drug.remove({}, (err) => {
      done();
    });
  });

  describe('/GET /drugs/find', () => {
    it('it should GET all drugs, but no results', (done) => {
      chai.request(server)
        .get('/drugs/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /drugs/create', () => {
    it('it should create a new drug called "Pot"', (done) => {
      const drug = {
        name: 'Pot',
        locationId: '1234',
        quantity: 1000,
        price: 10
      };

      chai.request(server)
        .post('/drugs/create')
        .send(drug)
        .end((err, res) => {
          createdId = res.body._id;

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Pot');
          res.body.should.have.property('locationId').eql('1234');
          res.body.should.have.property('quantity').eql(1000);
          res.body.should.have.property('price').eql(10);
          done();
        });
    });
  });

  describe('/PUT /drugs/update/:id', () => {
    it('it should update "Pot" to set a quantity of 10', (done) => {
      chai.request(server)
        .put(`/drugs/update/${createdId}`)
        .send({
          quantity: 10
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Pot');
          res.body.should.have.property('quantity').eql(10);
          done();
        });
    });
  });

  describe('/GET /drugs/find', () => {
    it(`it should GET all drugs with the new drug called "Pot" with quantity 10`, (done) => {
      chai.request(server)
        .get('/drugs/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('_id').eql(createdId);
          res.body[0].should.have.property('name').eql('Pot');
          res.body[0].should.have.property('quantity').eql(10);
          done();
        });
    });
  });

  describe('/POST /drugs/create', () => {
    it('it should NOT create a new drug with same name and infos', (done) => {
      const drug = {
        name: 'Pot',
        locationId: '1234',
        quantity: 10,
        price: 10,
      };

      chai.request(server)
        .post('/drugs/create')
        .send(drug)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('Drug already exists for this name and location');
          done();
        });
    });
  });

  describe('/POST /drugs/delete/:id', () => {
    it('it should delete "Pot"', (done) => {
      chai.request(server)
        .post(`/drugs/delete/${createdId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(createdId);
          done();
        });
    });
  });

  describe('/GET /drugs/find', () => {
    it(`it should not find any drug`, (done) => {
      chai.request(server)
        .get('/drugs/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /drugs/create', () => {
    it('it should NOT create a new drug called "Pot" missing "price" parameter', (done) => {
      const drug = {
        name: 'Pot',
        locationId: '1234',
        quantity: 1000
      };

      chai.request(server)
        .post('/drugs/create')
        .send(drug)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('Required parameters : [name, locationId, quantity, price]');
          done();
        });
    });
  });
});

