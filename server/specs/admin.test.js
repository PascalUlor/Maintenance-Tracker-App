/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai,
  request = supertest(app),
  invalidID = 50;

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
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get('/api/v1/requests')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Successfully Retrieved all requests');
        done();
      });
  });
});
