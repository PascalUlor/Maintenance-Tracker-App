import validator from 'validator';
import bcrypt from 'bcrypt';

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
          error: err
        });
      }
      const {
          fullName, email, password = hash
        } = req.body,
        errors = {};
        // check for undefined inputs
      if (fullName === undefined || password === undefined || email === undefined) {
        res.status(400);
        res.json({
          success: false,
          message: 'Some or all fields are undefined'
        });
      } else {
        // validate fullname
        if (validator.isEmpty(fullName)) {
          errors.fullName = 'fullName is required';
        }

        // Validate email
        if (!(validator.isEmail(email))) {
          errors.email = 'email is required';
        }
        // Validate password
        if (validator.isEmpty(password)) {
          errors.password = 'password is required';
        }


        if (Object.keys(errors).length !== 0) {
          return res.status(400).json(errors);
        } next();
      }
    });// bcrypt end
  }
}// end of classimport validator from 'validator';
