/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import data from './seed/user.data';
import input from './seed/requests.data';

const adminToken = { token: null };
const { expect } = chai;
const request = supertest(app);
const invalidID = 50;

describe('Test cases for Retrieving a users request', () => {
  it('Should return 200 for getting request', (done) => {
    request.get('/api/v1/requests/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Should return 404 for requests that does not exist', (done) => {
    request.get(`/api/v1/requests/${invalidID}`)
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Failed to retrieved request for user');
        done();
      });
  });
});

describe('test cases to Get All users request', () => {
  it('Should return `200` status code for admin login', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(data.adminLogin)
      .end((err, res) => {
        adminToken.token = res.body.token;
        expect(res.body).to.haveOwnProperty('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get('/api/v1/requests')
      .set('x-access-token', adminToken.token)
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Successfully Retrieved all requests');
        done();
      });
  });
});

describe('test cases for request status', () => {
  it('should return success message when approved successfully', (done) => {
    request.get('/api/v1/requests/1/approve')
      .set('x-access-token', adminToken.token)
      .send(input.validData1)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.status).to.equal('Approved');
        done();
      });
  });
  it('should return `200` status code success message if successfull', (done) => {
    request.get('/api/v1/requests/1/disapprove')
      .set('x-access-token', adminToken.token)
      .send(input.validData1)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.status).to.equal('Disapproved');
        done();
      });
  });
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get('/api/v1/requests/1/resolved')
      .set('x-access-token', adminToken.token)
      .send(input.validData1)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.status).to.equal('Resolved');
        done();
      });
  });
});
