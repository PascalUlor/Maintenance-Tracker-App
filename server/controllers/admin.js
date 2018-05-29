import reqHelper from '../helpers/reqHelper';
import db from '../models/testData';
import databaseLink from '../models/databaseLink';

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
  }// getUserRequest end

  /**
 * API method GET all request by user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllRequests(req, res) {
    databaseLink.query('select * from requests', (error, result) => {
      if (error) {
        return res.status(404).json({
          success: false,
          message: 'No request available',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully Retrieved all requests',
        data: result.rows,
      });
    });
  }

  /**
 * API method to mark request as approved by user
 * @param {obj} req
 * @param {obj} res
 * @param {obj} newStatus
 * @returns {obj} success message
 */
  static requestStatus(req, res, newStatus) {
    const id = parseInt(req.params.requestId, 10);
    const userQuery = 'UPDATE requests SET status = $1, updatedat = NOW() WHERE id = $2 returning *';
    const params = [newStatus, id];
    databaseLink.query(userQuery, params)
      .then(result =>
        reqHelper.success(res, 200, 'Request approved', result.rows[0]))
      .catch(error => reqHelper.error(res, 500, error.toString()));
  }
}
