import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import reqHelper from '../helpers/requestHelper';
import createToken from '../helpers/createToken';

import databaseConnection from '../models/databaseConnection';

dotenv.config();


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
      const { firstName, lastName, email } = req.body;
      const password = hash;
      const userQuery = 'INSERT INTO users (firstName, lastName, role, email, password) VALUES ($1, $2, $3, $4, $5) returning *';
      const params = [firstName, lastName, 'user', email, password];
      databaseConnection.query(userQuery, params)
        .then(result => (createToken(
          res, 201,
          'Signup successfull', result,
        ))).catch(error => reqHelper.error(res, 500, error.message));
    });
  }

  /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
  static userLogin(req, res) {
    const { email, password } = req.body;
    const errors = { form: 'Invalid email or password' };
    const userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseConnection.query(userQuery, params)
      .then((result) => {
        if (result.rows[0]) {
          const getPassword = bcrypt.compareSync(password, result.rows[0].password);
          if (getPassword) {
            return createToken(res, 200, 'User login Successfull', result);
          }
          return res.status(401).json({
            succes: false,
            errors,
          });
        }
        return res.status(401).json({
          success: false,
          errors,
        });
      }).catch(error => reqHelper.error(res, 500, error.message));
  }
}
