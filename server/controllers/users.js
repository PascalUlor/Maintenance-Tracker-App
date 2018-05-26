import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import reqHelper from '../helpers/reqHelper';
import createToken from '../helpers/userToken';

dotenv.config();

const databaseLink = require('../models/databaseLink');

databaseLink.connect();

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
      const userQuery = 'INSERT INTO users (fullName, role, email, password) VALUES ($1, $2, $3, $4) returning *';
      const params = [fullName, 'user', email, password];
      databaseLink.query(userQuery, params)
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
    const { email, password } = req.body,
      errors = { form: 'Invalid email or password' };
    const userQuery = 'SELECT email, password, id FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseLink.query(userQuery, params)
      .then((result) => {
        if (result.rows[0]) {
          console.log(result.rows[0]);
          const getPassword = bcrypt.compareSync(password, result.rows[0].password);
          if (getPassword) {
            return createToken(req, res, 200, 'Login Successfull', result);
          }
          return res.status(401).json({
            succes: false,
            errors
          });
        }
        return res.status(401).json({
          success: false,
          errors
        });
      }).catch(error => reqHelper.error(res, 500, error.message));
  }
}
