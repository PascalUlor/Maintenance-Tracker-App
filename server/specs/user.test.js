/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai,
  request = supertest(app);

describe('All Test cases for user Signup', () => {
  describe('Negative Test case for user signup', () => {
    it('Should return `400` if some fields are undefined', (done) => {
      request.post('/api/v1/users/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          password: '123'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.fullName).to.equal(undefined);
          expect(res.body.email).to.equal(undefined);
          expect(res.body).deep.equal({
            success: false,
            message: 'Some or all fields are undefined'
          });
          if (err) done(err);
          done();
        });
    });
    it('Should return `400` if email already exists', (done) => {
      request.post('/api/v1/users/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'Mike',
          email: 'mk@yahoo.com',
          password: '123'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User with email already exist');
          done();
        });
    });
    it('Should return `500` if password is not hashed', (done) => {
      request.post('/api/v1/users/auth/signup')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(500)
        .end((err, res) => {
          expect(res.body.password).to.equal(undefined);
          expect(res.status).to.equal(500);
          done();
        });
    });

    it('should return `400` status code with errors message for empty request', (done) => {
      request.post('/api/v1/users/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          fullName: '',
          email: '',
          password: ''
        }) // empty body request
        .expect(400)
        .end((err, res) => {
          expect(res.body.fullName).to.eql('fullName is required');
          expect(res.body.email).to.eql('email is required');
          expect(res.body.password).to.eql('password is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('Positive Test case for user signup', () => {
    it('Should return `200` for unique username signups', (done) => {
      request.post('/api/v1/users/auth/signup')
        .set('Content-Type', 'application/json')
        .send({
          fullName: 'Barry Allen',
          email: 'barry@yahoo.com',
          password: 'Allen'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Signup successfull');
          done();
        });
    });
  });
});

describe('All Test cases for user login', () => {
  describe('Negative Test case for user login', () => {
    it('Should return `400` for wrong user input', (done) => {
      request.post('/api/v1/users/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'barry@yahoo.com',
          password: 'west'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Access Denied');
          done();
        });
    });
  });
  describe('Positive Test case for user login', () => {
    it('Should return `200` for authenticated user details', (done) => {
      request.post('/api/v1/users/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'barry@yahoo.com',
          password: 'Allen'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Login Successfull');
          done();
        });
    });
  });
});
