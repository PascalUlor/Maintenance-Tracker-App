import db from '../models/testData';

/**
 * Class for /api/routes
 * @class appControll
 */
export default class usersController {
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
            status: 'Success',
            message: 'Request created successfully',
            data: db.requestDb
        });
}// Method to create request ends
}
