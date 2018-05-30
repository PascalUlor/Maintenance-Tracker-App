import checkItem from '../helpers/checkInput';

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

    const check = checkItem({ title, department, details });

    if (Object.keys(check).length > 0) {
      return res.status(400).json(check);
    } return next();
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

    if (!Number.isNaN(requestID)) {
      const check = checkItem({ title, department, details });

      if (Object.keys(check).length > 0) {
        return res.status(400).json(check);
      }
    }
    return next();
  }
}
