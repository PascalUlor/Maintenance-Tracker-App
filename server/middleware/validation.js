import validator from 'validator';

/**
 * Validates all routes
 * @class Validator
 */
export default class Validation {
  /**
     * Validates all request workDescription
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
  static createRequestValidation(req, res, next) {
    const {
        location, Details
      } = req.body,
      errors = {};
    // check for undefined inputs
    if (location === undefined || Details === undefined) {
      res.status(400);
      res.json({
        success: false,
        message: 'Some or all fields are undefined'
      });
    } else {
      // validate request Details
      if (!(validator.isEmpty(Details))) {
        if (!(validator.isLength(Details, { min: 20, max: 1000 }))) {
          errors.Details = 'Request details must be between 20 to 1000 characters';
        }
      } else {
        errors.Details = 'Request details is required';
      }

      // validate location
      if (validator.isEmpty(location)) {
        errors.location = 'location is required';
      }

      if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
      } next();
    }
  }
}// end of class
