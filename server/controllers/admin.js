import reqHelper from '../helpers/requestHelper';
import db from '../models/testData';
import databaseLink from '../models/databaseConnection';

const dotenv = require('dotenv');

dotenv.config();


/**
 * Class for /api/routes
 * @class adminController
 */
export default class adminController {
  /**
     * API method to GET all request for a particular user
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getUserRequest(req, res) {
    const uId = parseInt(req.params.id, 10);
    if (uId in db.requestDataBase.map(request => request.userId)) {
      const userRequest = db.requestDataBase.filter(request => request.userId === uId);
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved request for user',
        userRequest,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Failed to retrieved request for user',
    });
  }

  /**
 * API method GET all request by user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllRequests(req, res) {
    const checkId = 'SELECT * FROM users WHERE id = 1 LIMIT 1;';
    const { userId } = req.decoded;
    const userQuery = 'select * from requests';
    databaseLink.query(checkId)
      .then((result) => {
        if (userId !== result.rows[0].id) {
          return reqHelper.error(res, 400, 'Access Denied');
        }
        return databaseLink.query(userQuery)
          .then(requests =>
            reqHelper.success(res, 200, 'Successfully Retrieved all requests', requests.rows))
          .catch(error => reqHelper.error(res, 500, error.toString()));
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  }

  /**
 * API method to mark request as approved, disapproved or resolved by user
 * @param {obj} req
 * @param {obj} res
 * @param {obj} newStatus
 * @returns {obj} success message
 */
  static requestStatus(req, res, newStatus) {
    const id = parseInt(req.params.requestId, 10);
    const checkId = 'SELECT * FROM users WHERE id = 1 LIMIT 1;';
    const { userId } = req.decoded;
    const userQuery = 'UPDATE requests SET status = $1, updatedat = NOW() WHERE id = $2 returning *';
    const params = [newStatus, id];

    databaseLink.query(checkId)
      .then((result) => {
        if (userId !== result.rows[0].id) {
          return reqHelper.error(res, 400, 'Access Denied');
        }
        return databaseLink.query(userQuery, params)
          .then(state =>
            reqHelper.success(res, 200, newStatus, state.rows[0]))
          .catch(error => reqHelper.error(res, 500, error.toString()));
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  }
}
