//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import Player from '../src/server/models/Player.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Players', () => {
  let createdId;

  // Before the tests we empty the database
  before((done) => {
    Player.remove({}, (err) => {
      done();
    });
  });

  describe('/GET /players/find', () => {
    it('it should GET all players, but no results', (done) => {
      chai.request(server)
        .get('/players/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /players/create', () => {
    it('it should create a new player called "Mike"', (done) => {
      const player = {
        name: 'Mike',
        currentLocationId: 1,
        money: 1000,
        health: 100,
      };

      chai.request(server)
        .post('/players/create')
        .send(player)
        .end((err, res) => {
          createdId = res.body._id;

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Mike');
          res.body.should.have.property('currentLocationId').eql(1);
          res.body.should.have.property('money').eql(1000);
          res.body.should.have.property('health').eql(100);
          done();
        });
    });
  });

  describe('/PUT /players/update/:id', () => {
    it('it should update "Mike" to set a his money to 123', (done) => {
      chai.request(server)
        .put(`/players/update/${createdId}`)
        .send({
          money: 123
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Mike');
          res.body.should.have.property('money').eql(123);
          done();
        });
    });
  });

  describe('/GET /players/find', () => {
    it(`it should GET all players with the new player called "Mike" with money = 123`, (done) => {
      chai.request(server)
        .get('/players/find')
        .query({
          name: 'Mike',
          money: 123,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('_id').eql(createdId);
          res.body[0].should.have.property('name').eql('Mike');
          res.body[0].should.have.property('money').eql(123);
          done();
        });
    });
  });

  describe('/POST /players/create', () => {
    it('it should NOT create a new player with same name', (done) => {
      const player = {
        name: 'Mike',
        currentLocationId: 1,
        money: 1000,
        health: 100,
        bankId: 1,
      };

      chai.request(server)
        .post('/players/create')
        .send(player)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').contains('duplicate key error');
          done();
        });
    });
  });

  describe('/POST /players/delete/:id', () => {
    it('it should delete player "Mike"', (done) => {
      chai.request(server)
        .post(`/players/delete/${createdId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql(createdId);
          done();
        });
    });
  });

  describe('/GET /players/find', () => {
    it(`it should not find any players`, (done) => {
      chai.request(server)
        .get('/players/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

