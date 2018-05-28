import validator from 'validator';
import bcrypt from 'bcrypt';

const dotenv = require('dotenv');

dotenv.config();

const databaseLink = require('../models/databaseLink');


/**
 * Validates all routes
 * @class Validator
 */
export default class userValidation {
  /**
     * Validates all business details
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
  static checkUser(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      const { fullName, email, password = hash } = req.body;
      const errors = {};

      const userEmail = {
        text: 'SELECT * FROM users WHERE email = $1;',
        values: [req.body.email],
      };
      return databaseLink.query(userEmail, (error, result) => {
        if (result.rows[0]) {
          return res.status(409).json({
            success: false,
            message: 'User with email already exist',
          });
        }

        if (fullName === undefined || password === undefined || email === undefined) {
          res.status(400);
          res.json({
            success: false,
            message: 'Some or all fields are undefined',
          });
        } else {
          if (validator.isEmpty(fullName)) {
            errors.fullName = 'fullName is required';
          }

          if (!(validator.isEmail(email))) {
            errors.email = 'email is required';
          }
          if (validator.isEmpty(password)) {
            errors.password = 'password is required';
          }

          if (Object.keys(errors).length !== 0) {
            return res.status(400).json(errors);
          }
        }
        return next();
      });
    });
  }
}
