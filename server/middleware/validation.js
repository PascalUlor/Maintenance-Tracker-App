import validator from 'validator';

/**
 * Validate Request POST and GET req
 * @class Validation
 */
export default class requestValidation {
  /**
     *  @description validate request details on create and make request operations
     * @memberof requestValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static createRequestValidation(req, res, next) {
    const { title, department, details } = req.body;
    const errors = {};
    if (title === undefined || department === undefined ||
       details === undefined) {
      return res.status(422).json({ success: false, message: 'Some or all fields are undefined' });
    }

    if (!validator.isEmpty(title)) {
      if (title.search(/[^A-Za-z\s]/) !== -1) {
        errors.title = 'title must be alphabetical';
      }
    } else { errors.title = 'title is required'; }

    if (!(validator.isEmpty(title))) {
      if (!(validator.isLength(title, { min: 3, max: 50 }))) {
        errors.title = 'title must be between 3 to 50 characters';
      }
    } else {
      errors.title = 'title is required';
    }

    if (!(validator.isEmpty(details))) {
      if (!(validator.isLength(details, { min: 20, max: 1000 }))) {
        errors.details = 'Details field must be between 20 to 1000 characters';
      }
    } else {
      errors.details = 'Details field is required';
    }

    if (validator.isEmpty(department)) {
      errors.department = 'department is required';
    }


    if (Object.keys(errors).length !== 0) {
      return res.status(400).json(errors);
    }
    return next();
  }

  /**
     *  @description validate request details on create and make request operations
     * @memberof requestValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
  static updateRequestValidation(req, res, next) {
    const { title, department, details } = req.body;
    const requestID = parseInt(req.params.requestId, 10);
    const errors = {};

    if (!Number.isNaN(requestID)) {
      if (!(title || department || details)) {
        return res.status(422).json({ success: false, message: 'Enter a valid update' });
      }
      if (title) {
        if (title.search(/[^A-Za-z\s]/) !== -1) {
          errors.title = 'title must be alphabetical';
        } else if (!(validator.isLength(title, { min: 3, max: 50 }))) {
          errors.title = 'title must be between 3 to 50 characters';
        }
      }
      if (details) {
        if (!(validator.isLength(details, { min: 20, max: 1000 }))) {
          errors.details = 'Details field must be between 20 to 1000 characters';
        }
      }

      if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
      }
    }
    return next();
  }
}
