/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models/testData';


const { expect } = chai,
  request = supertest(app),
  invalidID = 50;

describe('All test cases for application', () => {
  describe('Test case for loading application home page', () => {
    it('should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            name: 'Welcome to Maintenance Tracker',
            message: 'Your Service, Our Pleasure'
          });
          if (err) done(err);
          done();
        });
    });
  });
  // test invalid routes
  describe('Test Case For Invalid Routes', () => {
    it('Should return a message when an invalid route is accessed', (done) => {
      request
        .get('/api/v1/some-rubbish')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Invalid routes'
          });
          if (err) done(err);
          done();
        });
    });

    it('should fail to get route', (done) => {
      request.get('/api/v1')
        .set('Contet-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Invalid routes'
          });
          if (err) done(err);
          done();
        });
    });

    it('should return `404` page for all invalid routes', (done) => {
      request.get('/weconnect/recipes')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Invalid routes'
          });
          if (err) done(err);
          done();
        });
    });
  });

  describe('All test cases for POSTing a new request', () => {
    describe('Negative test cases for posting a request', () => {
      it('should return `400` status code with error message for undefined requests', (done) => {
        request.post('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({}) // request body not defined
          .expect(400)
          .end((err, res) => {
            expect(res.body).deep.equal({
              success: false,
              message: 'Some or all fields are undefined'
            });
            if (err) done(err);
            done();
          });
      });

      it('should return `400` status code with errors message for empty request', (done) => {
        request.post('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({
            userId: '',
            location: '',
            Details: ''
          }) // empty body request
          .expect(400)
          .end((err, res) => {
            expect(res.body.Details).to.eql('Request details is required');
            expect(res.body.location).to.eql('location is required');
            expect(res.body.userId).to.eql('user id is required');
            expect(res.status).to.equal(400);
            if (err) done(err);
            done();
          });
      });

      it('should return `400` status code with error messages for details less than 20 character', (done) => {
        request.post('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({
            userId: '2',
            location: 'hgfcjgvh',
            Details: 'abcd'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('Details').eql('Request details must be between 20 to 1000 characters');
            done();
          });
      });
      it('should return `400` status code with error messages if userId is a string', (done) => {
        request.post('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({
            userId: 'string',
            location: 'hgfcjgvh',
            Details: 'Request details must be between 20 to 1000 characters'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('userId').eql('user id must be an integer');
            done();
          });
      });
    });

    describe('Positive test case for adding a request', () => {
      it('should return `201` status code with success messages for successfull post', (done) => {
        request.post('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({
            userId: '1',
            location: 'Lagos',
            Details: 'Request details must be between 20 to 1000 characters'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Request created successfully');
            done();
          });
      });
    });
  });// End of Add request test

  describe('All test cases for modifying a request', () => {
    describe('All negative test cases for modifying a request', () => {
      it('should return `400` status code with error messages for invalid request id', (done) => {
        request.put(`/api/v1/users/requests/${invalidID}`)
          .set('Content-Type', 'application/json')
          .send({
            userId: '1',
            location: 'Lagos',
            Details: 'This is for the repair of all faulty equipments'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).deep.equal({
              success: false,
              message: 'Request with id does not exist'
            });
            if (err) done(err);
            done();
          });
      });

      it('should return `400` status code with error messages for undefined', (done) => {
        request.put('/api/v1/users/requests/1')
          .set('Content-Type', 'application/json')
          .send({
            userId: '',
            location: '',
            Details: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.Details).to.eql('Request details is required');
            expect(res.body.location).to.eql('location is required');
            expect(res.body.userId).to.eql('user id is required');
            if (err) done(err);
            done();
          });
      });
    });

    describe('Positive test case for modifying a request', () => {
      it('should return `200` status code with success messages successfull update', (done) => {
        request.put('/api/v1/users/requests/2')
          .set('Content-Type', 'application/json')
          .send({
            userId: '1',
            location: 'Lagos',
            Details: 'Request details must be between 20 to 1000 characters'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Request with id successfully updated');
            if (err) done(err);
            done();
          });
      });
    });
  });// Update Test end

  describe('Test cases for Getting All user request', () => {
    describe('Positive test cases for Get All user request', () => {
      it('should return `200` status code with `res.body` success message', (done) => {
        request.get('/api/v1/users/requests')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Successfully Retrieved all requests');
            expect(db.requestDb);
            done();
          });
      });
    });
  });

  describe('Test case for retrieving a Single request', () => {
    describe('Negative test case for retriving a single request', () => {
      it('Should return `400` status code with for invalid id', (done) => {
        request.get(`/api/v1/users/requests/${invalidID}`)
          .set('Content-Type', 'application/json')
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Request does not exist');
            done();
          });
      });
    });

    describe('Positive test case for retriving a single request', () => {
      it('Should return `200` status code with `res body` success message', (done) => {
        request.get('/api/v1/users/requests/2')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Successfully Retrieved Request');
            done();
          });
      });
    });
  });

  describe('Test cases for deleting request', () => {
    describe('All negative delete test cases', () => {
      it('should return `400` status code with error message for failed invalid Id', (done) => {
        request.delete(`/api/v1/users/requests/${invalidID}`)
          .set('Content-Type', 'application/json')
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Request with id does not exist');
            done();
          });
      });
    });

    describe('Positive delete test cases', () => {
      it('should return `200` status code with success message', (done) => {
        request.delete('/api/v1/users/requests/1')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Request successfully deleted');
            done();
          });
      });
    });
  });
});// End of All test cases
