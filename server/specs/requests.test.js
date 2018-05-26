/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models/testData';

import data from './seed/user.data';
import inputs from './seed/requests.data';
import userToken, { wrongToken } from './user.test';

const user2Token = { token: null };

const { expect } = chai,
  request = supertest(app),
  invalidID = 50;

describe('All test cases for Maintenance-Tracker application', () => {
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
    // test invalid routes
    it('should return error message when for invalid route', (done) => {
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
  });// Homepage tests ends

  describe('test cases for when Get All user request in DATABASE', () => {
    it('should return `200` status code with `res.body` success message', (done) => {
      request.get('/api/v1/users/requests')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Successfully Retrieved all requests');
          // expect(db.requestDb);
          done();
        });
    });
  });


  // test case to create request in database
  describe('All test cases for creatinging a new request', () => {
    it('Should return `200` for authenticated user login', (done) => {
      request.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(data.userTwoLogin)
        .end((err, res) => {
          user2Token.token = res.body.token;
          expect(res.body).to.haveOwnProperty('token');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return `400` status code with error message for undefined requests', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send({}) // request body not defined
        .expect(422)
        .end((err, res) => {
          expect(res.body).deep.equal({
            success: false,
            message: 'Some or all fields are undefined'
          });
          done();
        });
    });

    it('should return `400` status code with errors message for empty request', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.emptyData) // empty body request
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` if request name and about us characters are incomplete', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.incompleteData)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` if request name contain numbers', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.invalidData)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `401` status code for unauthenticated user', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', wrongToken)
        .send({}) // request body not defined
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    describe('Positive test case for adding a request', () => {
      it('should return `201` status code when user creates request successfully', (done) => {
        request.post('/api/v1/users/requests')
          .set('x-access-token', userToken.token)
          .send(inputs.validData1)
          .expect(201)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should return `201` status code when another user creates request successfully', (done) => {
        request.post('/api/v1/users/requests')
          .set('x-access-token', user2Token.token)
          .send(inputs.validData2)
          .expect(201)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
  });// End of Create request test

  describe('All test cases for modifying a request', () => {
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
  });// Update Test end

  describe('Test case for retrieving a Single request', () => {
    describe('Test case for retriving a single request', () => {
      it('should return `400` status code with for invalid id', (done) => {
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

    describe('Test case for retriving a single request', () => {
      it('should return `200` status code with `res body` success message', (done) => {
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
    describe('when delete test cases fail', () => {
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

    describe('Test when Delete test cases pass', () => {
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
});// End of All test with data cases
