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
    it('should load the application home page', (done) => {
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
    it('should return an error message for invalid routes', (done) => {
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


  // test case to create request in database
  describe('All test cases for creatinging a new request', () => {
    it('Should return `200` status code for authenticated user login', (done) => {
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
    it('should return `400` status code with for undefined requests', (done) => {
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

    it('should return status code `400` with errors message for empty request', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.emptyData) // empty body request
        .expect(400)
        .end((err, res) => {
          expect(res.body.title).to.eql('title is required');
          expect(res.body.details).to.eql('Details field is required');
          expect(res.body.department).to.eql('department is required');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` if request title and details characters are incomplete', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.incompleteData)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('title').eql('title must be between 3 to 50 characters');
          expect(res.body).to.have.property('details').eql('Details field must be between 20 to 1000 characters');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return a `400` status code if request title contain numbers', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.invalidData)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('title').eql('title must be alphabetical');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should deny an unauthenticated user access', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', wrongToken)
        .send({}) // request body not defined
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should allow authenticated users to create request successfully', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send(inputs.validData1)
        .expect(201)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Request created successfully');
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should allow another authenticated user to create request successfully', (done) => {
      request.post('/api/v1/users/requests')
        .set('x-access-token', user2Token.token)
        .send(inputs.validData2)
        .expect(201)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Request created successfully');
          expect(res.status).to.equal(201);
          done();
        });
    });
  });// End of Create request test

  describe('All test cases for updating a users request', () => {
    it('should return an error message for an invalid request id', (done) => {
      request.put(`/api/v1/users/requests/${invalidID}`)
        .set('x-access-token', userToken.token)
        .send(inputs.validUpdate1)
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            errors: 'Request with id does not exist',
            success: false
          });
          done();
        });
    });

    it('should return a `422` status code with error messages for undefined inputs', (done) => {
      request.put('/api/v1/users/requests/1')
        .set('x-access-token', userToken.token)
        .send(inputs.emptyData)
        .expect(422)
        .end((err, res) => {
          expect(res.body).deep.equal({
            success: false,
            message: 'Enter a valid update'
          });
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('should return `400` if update data is invalid', (done) => {
      request.put('/api/v1/users/requests/1')
        .set('x-access-token', userToken.token)
        .send(inputs.invalidData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.title).to.eql('title must be alphabetical');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should flag an error with `401` status code for unauthenticated user update', (done) => {
      request.put('/api/v1/users/requests/1')
        .set('x-access-token', wrongToken)
        .send(inputs.validUpdate1) // request body not defined
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.eql({
            success: false,
            errors: 'Authentication failed. Token is invalid or expired'
          });
          done();
        });
    });
    it('should not allow a user to update a request he/she did not create', (done) => {
      request.put('/api/v1/users/requests/1')
        .set('x-access-token', user2Token.token)
        .send(inputs.validUpdate1) // request body not defined
        .expect(401)
        .end((err, res) => {
          expect(res.body).deep.equal({
            errors: 'Access Denied. You are not authorized to update this request',
            success: false,
          });
          done();
        });
    });

    it('should return a success message for successfull update', (done) => {
      request.put('/api/v1/users/requests/1')
        .set('x-access-token', userToken.token)
        .send(inputs.validUpdate1)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });// Update Test end

  describe('test cases to Get request for logged in user', () => {
    it('should return `200` status code with `res.body` success message', (done) => {
      request.get('/api/v1/users/requests')
        .set('x-access-token', userToken.token)
        .send({})
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Requests with userId successfully retrieved');
          done();
        });
    });

    it('Should return error single request qery with invalid id', (done) => {
      request.get(`/api/v1/users/requests/${invalidID}`)
        .set('x-access-token', userToken.token)
        .send({})
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.equal('Request with id does not exist');
          done();
        });
    });

    it('Should return success message when valid id and token are entered', (done) => {
      request.get('/api/v1/users/requests/1')
        .set('x-access-token', userToken.token)
        .send({})
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('User request successfully retrieved');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });


  // describe('Test case for retrieving a Single request', () => {
  //   it('should return `400` status code with for invalid id', (done) => {
  //     request.get(`/api/v1/users/requests/${invalidID}`)
  //       .set('Content-Type', 'application/json')
  //       .send({})
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.success).to.equal(false);
  //         expect(res.body.message).to.equal('Request does not exist');
  //         done();
  //       });
  //   });

  //   it('should return `200` status code with `res body` success message', (done) => {
  //     request.get('/api/v1/users/requests/2')
  //       .set('Content-Type', 'application/json')
  //       .send({})
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(res.body.success).to.equal(true);
  //         expect(res.body.message).to.equal('Successfully Retrieved Request');
  //         done();
  //       });
  //   });
  // });

  describe('Test cases for deleting request', () => {
    it('should return an error message (400) for invalid Id', (done) => {
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
});// End of All test with data cases
