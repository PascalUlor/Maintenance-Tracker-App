import db from '../models/testData';
/**
 * Class for /api/ routes
 * @class appControll
 */
export default class userController {
  /**
   * API method to signup user
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} success message
   */
  static userSignup(req, res) {
    const { email } = req.body;
    const target = email;
    const found = db.userDb.find(user => user.email === target);
    if (found) {
      return res.status(400).json({
        success: false,
        message: 'User with email already exist',
        error: true
      });
    }
    db.userDb.push(req.body);
    return res.status(200).json({
      success: true,
      message: 'Signup successfull. You may proceed',
      error: false,
    });
  }// signup end
}
