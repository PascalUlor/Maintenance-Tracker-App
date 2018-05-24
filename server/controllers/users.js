import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import reqHelper from '../helpers/reqHelper';
import createToken from '../helpers/userToken';
import db from '../models/testData';

dotenv.config();

const dataBaseLink = require('../models/dataBaseLink');

dataBaseLink.connect();

/**
 * Class for /api/routes
 * @class userController
 */
export default class userController {
  /**
   * API method to signup user
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} success message
   */
  static userSignup(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const { fullName, email } = req.body,
        password = hash;
      const sql = 'INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3) returning *';
      const params = [fullName, email, password];
      dataBaseLink.query(sql, params)
        .then(result => (createToken(
          req, res, 201,
          'Signup successfull', result
        ))).catch(error => reqHelper.error(res, 500, error.message));
    });// bcrypt end
  }// user signup end

  /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
  static userLogin(req, res) {
    const { email, password } = req.body;
    const target1 = email;
    const target2 = password;
    const findEmail = db.userDataBase.find(user => user.email === target1);
    const findPassword = db.userDataBase.find(user => user.password === target2);
    if (findEmail && findPassword) {
      return res.status(200).json({
        success: true,
        message: 'Login Successfull',
        data: { email }
      });
    }
    res.status(401).json({
      success: false,
      message: 'Access Denied',
    });
  }
}
