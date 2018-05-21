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
  describe('Positive case to GET a users request', () => {
    it('Should return 200 for getting request', (done) => {
      request.get('/api/v1/users/requests/2/admin')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('Negative case for GET Reviews', () => {
    it('Should return 404 for reviews that does not exist', (done) => {
      request.get(`/api/v1/users/requests/${invalidID}/admin`)
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
});
