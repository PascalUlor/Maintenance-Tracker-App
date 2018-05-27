import db from '../models/testData';

const dotenv = require('dotenv');

dotenv.config();

const databaseLink = require('../models/databaseLink');

databaseLink.connect();

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
      console.log(uId);
      res.status(200);
      res.json({
        success: true,
        message: 'Successfully retrieved request for user',
        userRequest
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Failed to retrieved request for user'
      });
    }
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
          message: 'No request available'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully Retrieved all requests',
        data: result.rows
      });
    });
  }
}
