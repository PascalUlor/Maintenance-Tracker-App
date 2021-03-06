import reqHelper from '../helpers/requestHelper';
import db from '../models/testData';
import databaseConnection from '../models/databaseConnection';

const dotenv = require('dotenv');

dotenv.config();


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
    const { title, department, details } = req.body;
    const { userId } = req.decoded;
    const userQuery = 'INSERT INTO requests (title, department, details, userId, status) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [title, department, details, userId, 'pending'];
    databaseConnection.query(userQuery, params)
      .then(result => reqHelper.success(
        res, 201,
        'Request created successfully', result.rows[0],
      )).catch(error => reqHelper.error(res, 500, error.message));
  }


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
    databaseConnection.query(checkId, value)
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
    databaseConnection.query(checkId, value)
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
    const { title, department, details } = req.body;
    const { userId } = req.decoded;
    const id = parseInt(req.params.requestId, 10);
    const checkId = 'SELECT * FROM requests WHERE id = $1 LIMIT 1;';
    const value = [id];
    const userQuery = 'UPDATE requests SET title = $1, department = $2, details = $3 WHERE id = $4 RETURNING *';
    const params = [title, department, details, id];
    databaseConnection.query(checkId, value)
      .then((result) => {
        if (!result.rows[0]) {
          return reqHelper.error(res, 400, 'Request with id does not exist');
        } else if (userId !== result.rows[0].userid || result.rows[0].status !== 'pending') {
          return reqHelper.error(res, 400, 'Access Denied. You are not authorized to update this request');
        }
        return databaseConnection.query(userQuery, params)
          .then(update =>
            reqHelper.success(res, 200, 'Request with id successfully updated', update.rows[0]))
          .catch(error => reqHelper.error(res, 500, error.toString()));
      }).catch(error => reqHelper.error(res, 500, error.toString()));
  }

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
        data: db.requestDataBase,
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Request with id does not exist',
      });
    }
  }
}
