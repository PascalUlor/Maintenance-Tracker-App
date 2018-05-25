/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import inputs from './seed/user.data';

const userToken = { token: null };

const { expect } = chai,
  request = supertest(app);


describe('All Test cases for user Signup', () => {
  it('Should return `201` for unique email signups', (done) => {
    request.post('/api/v1/users/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.validInput1)
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.message).to.equal('Signup successfull');
        expect(res.body.user).to.eql({
          id: 2,
          fullName: 'Bruce Banner',
          email: 'banner@yahoo.com'
        });
        if (err) done(err);
        done();
      });
  });
  it('Should return `201` when another unique email signups', (done) => {
    request.post('/api/v1/users/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.validInput2)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('success').equal(true);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.message).to.equal('Signup successfull');
        expect(res.body.user).to.eql({
          id: 3,
          fullName: 'Mike',
          email: 'mk@yahoo.com'
        });
        if (err) done(err);
        done();
      });
  });

  it('should return `400` if some fields are undefined', (done) => {
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
  it('should return `400` if email already exists', (done) => {
    request.post('/api/v1/users/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.existingEmail)
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

describe('All Test cases for user login', () => {
  it('Should return `401` for wrong user input', (done) => {
    request.post('/api/v1/users/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.invalidEmailPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Should return `401` and deny access if wrong userName is not entered', (done) => {
    request.post('/api/v1/users/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.noEmail)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // expect(res.body.userName).to.eql('Email is required');
        done();
      });
  });
  it('Should return `401` and deny access if wrong Password is not entered', (done) => {
    request.post('/api/v1/users/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.noPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        // expect(res.body.password).to.eql('Password is required');
        done();
      });
  });
  it('Should return `200` for authenticated user details', (done) => {
    request.post('/api/v1/users/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.userOneLogin)
      .end((err, res) => {
        console.log(res.body.token);
        userToken.token = res.body.token;
        expect(res.body).to.haveOwnProperty('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
