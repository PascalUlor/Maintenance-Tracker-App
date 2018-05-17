import db from '../models/testData';

/**
 * Class for /api/routes
 * @class appControll
 */
export default class requestController {
    /**
     * API method to (POST) create a request
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static createRequest(req, res) {
        db.requestDb.push({
            id: db.requestDb.length + 1,
            location: req.body.location,
            workDescription: req.body.workDescription
        });
        res.status(201);
        res.json({
            success: true,
            message: 'Request created successfully',
            data: db.requestDb
        });
}// Method to create request ends

/**
 * API method GET all request by user
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
static getAllRequests(req, res) {
    if (db.requestDb.length !== 0) {
        if (!req.query.sort) {
            res.status(200);
            res.json({
            success: true,
            message: 'Successfully Retrieved all requests',
            data: db.requestDb
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
    const {
location, workDescription
} = req.body;
const index = parseInt(req.params.id, 10);
  const edit = {
  id: index,
  location,
  workDescription
  };
    const found = db.requestDb.find(request => request.id === index);
      if (found) {
        db.requestDb[index - 1] = edit;
         return res.status(200).json({
          success: true,
          message: 'Request with id successfully updated',
          data: db.requestDb
          });
      }
        return res.status(400).json({
          success: false,
          message: 'Request with id does not exist'
          });
} // Method to Update business ends
}
