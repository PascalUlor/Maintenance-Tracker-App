import reqHelper from '../helpers/reqHelper';
import db from '../models/testData';

const dotenv = require('dotenv');

dotenv.config();

const databaseLink = require('../models/databaseLink');

databaseLink.connect();

/**
 * Class for /api/routes
 * @class requestController
 */
export default class requestController {
  /**
     * API method to (POST) create a request
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
  static createRequest(req, res) {
    const { title, department, details } = req.body, { userId } = req.decoded;
    const userQuery = 'INSERT INTO requests (title, department, details, userId, status) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [title, department, details, userId, 'pending'];
    databaseLink.query(userQuery, params)
      .then(result => reqHelper.success(
        res, 201,
        'Request created successfully', result.rows[0]
      )).catch(error => reqHelper.error(res, 500, error.message));
  }// Method to create request ends


  /**
 * API method GET all request of logged in user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllRequestsUser(req, res) {
    const { userId } = req.decoded;
    const checkId = 'SELECT * FROM requests WHERE userId = $1;';
    const value = [userId];
    databaseLink.query(checkId, value)
      .then((result) => {
        if (result.rows.length > 0) {
          reqHelper.success(res, 200, 'Requests with userId successfully retrieved', result.rows);
        } else {
          reqHelper.error(res, 400, 'Request for user does not exist');
        }
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  }

  /**
 * API method GET single request of logged in user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getUserSingleRequests(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const { userId } = req.decoded;
    const checkId = 'SELECT * FROM requests WHERE userId = $1 AND id = $2 LIMIT 1;';
    const value = [userId, id];
    databaseLink.query(checkId, value)
      .then((result) => {
        if (result.rows[0]) {
          reqHelper.success(res, 200, 'User request successfully retrieved', result.rows);
        } else {
          reqHelper.error(res, 400, 'Request with id does not exist');
        }
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  }


  /**
 * API method to (PUT) update a Request
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with success or error message
 */
  static updateRequests(req, res) {
    const { title, department, details } = req.body, { userId } = req.decoded, id = parseInt(req.params.requestId, 10);
    const checkId = 'SELECT * FROM requests WHERE id = $1 LIMIT 1;';
    const value = [id];
    const userQuery = 'UPDATE requests SET title = $1, department = $2, details = $3 WHERE id = $4 RETURNING *';
    const params = [title, department, details, id];
    databaseLink.query(checkId, value)
      .then((result) => {
        if (!result.rows[0]) {
          return reqHelper.error(res, 400, 'Request with id does not exist');
        } else if (userId !== result.rows[0].userid) {
          return reqHelper.error(res, 400, 'Access Denied. You are not authorized to update this request');
        }
        databaseLink.query(userQuery, params)
          .then(update =>
            reqHelper.success(res, 200, 'Request with id successfully updated', update.rows[0]))
          .catch(error => reqHelper.error(res, 500, error.toString()));
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  } // Method to Update request ends

  // /**
  //    * API method to GET a single request
  //    * @param {obj} req
  //    * @param {obj} res
  //    * @returns {obj} success message
  //    */
  // static getSingleRequest(req, res) {
  //   const index = parseInt(req.params.requestId, 10);
  //   const findRequest = db.requestDataBase.find(request => request.id === index);
  //   if (findRequest) {
  //     return res.status(200).json({
  //       success: true,
  //       message: 'Successfully Retrieved Request',
  //       data: db.requestDataBase[index - 1]
  //     });
  //   }
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Request does not exist'
  //   });
  // }// getSinglerequest ends

  /**
 * API method DELETE a rquest from requestDb
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} insert success message
 */
  static deleteRequest(req, res) {
    const index = parseInt(req.params.requestId, 10);
    const findRequest = db.requestDataBase.find(request => request.id === index);
    if (findRequest) {
      const newRequestList = db.requestDataBase.filter(request => request.id !== index);
      db.requestDataBase = newRequestList;
      res.status(200);
      res.json({
        success: true,
        message: 'Request successfully deleted',
        data: db.requestDataBase
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Request with id does not exist'
      });
    }
  }// Method to delete business ends
}
