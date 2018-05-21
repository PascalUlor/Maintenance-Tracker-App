import db from '../models/testData';
/**
 * Class for /api/routes
 * @class userController
 */
export default class userController {
  /**
   * API method to signup user
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} success message
   */
  static userSignup(req, res) {
    const { fullName, email, id = db.userDataBase.length + 1 } = req.body;
    const target = email;
    const findEmail = db.userDataBase.find(user => user.email === target);
    if (findEmail) {
      return res.status(400).json({
        success: false,
        message: 'User with email already exist'
      });
    }
    db.userDataBase.push(req.body);
    return res.status(200).json({
      success: true,
      message: 'Signup successfull',
      data: { id, fullName, email }
    });
  }// user signup end

  /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
  static userLogin(req, res) {
    const { email, password } = req.body;
    const target1 = email;
    const target2 = password;
    const findEmail = db.userDataBase.find(user => user.email === target1);
    const findPassword = db.userDataBase.find(user => user.password === target2);
    if (findEmail && findPassword) {
      return res.status(200).json({
        success: true,
        message: 'Login Successfull',
        data: { email }
      });
    }
    res.status(401).json({
      success: false,
      message: 'Access Denied',
    });
  }
}
