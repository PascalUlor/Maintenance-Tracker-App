/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai,
  request = supertest(app);

describe('All test cases for DATABASE', () => {
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
  });

  describe('Test cases for Getting All user request', () => {
    describe('test cases for when Get All user request pass', () => {
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
  });
});// End of All test with data cases
