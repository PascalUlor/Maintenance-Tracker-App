// import db from '../models/testData';

const dotenv = require('dotenv');

dotenv.config();

const db = require('../models/db');

db.connect();

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
    db.requestDataBase.push({
      id: db.requestDataBase.length + 1,
      userId: parseInt(req.body.userId, 10),
      location: req.body.location,
      Details: req.body.Details
    });
    res.status(201);
    res.json({
      success: true,
      message: 'Request created successfully',
      data: db.requestDataBase
    });
  }// Method to create request ends

  /**
 * API method GET all request by user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllRequests(req, res) {
    if (db.requestDataBase.length !== 0) {
      if (!req.query.sort) {
        res.status(200);
        res.json({
          success: true,
          message: 'Successfully Retrieved all requests',
          data: db.requestDataBase
        });
      }
    } else {
      res.status(404);
      res.json({
        success: false,
        message: 'No request available'
      });
    }
  }

  /**
 * API method to (PUT) update a Request
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with success or error message
 */
  static updateRequests(req, res) {
    const { location, Details } = req.body;
    const index = parseInt(req.params.id, 10);
    const edit = {
      id: index,
      userId: parseInt(req.body.userId, 10),
      location,
      Details
    };
    const findRequest = db.requestDataBase.find(request => request.id === index);
    if (findRequest) {
      db.requestDataBase[index - 1] = edit;
      return res.status(200).json({
        success: true,
        message: 'Request with id successfully updated',
        data: db.requestDataBase
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Request with id does not exist'
    });
  } // Method to Update request ends

  /**
     * API method to GET a single request
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getSingleRequest(req, res) {
    const index = parseInt(req.params.id, 10);
    const findRequest = db.requestDataBase.find(request => request.id === index);
    if (findRequest) {
      return res.status(200).json({
        success: true,
        message: 'Successfully Retrieved Request',
        data: db.requestDataBase[index - 1]
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Request does not exist'
    });
  }// getSinglerequest ends

  /**
 * API method DELETE a rquest from requestDb
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} insert success message
 */
  static deleteRequest(req, res) {
    const index = parseInt(req.params.id, 10);
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
