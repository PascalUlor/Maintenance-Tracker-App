import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import reqHelper from '../helpers/requestHelper';

dotenv.config();


/**
 * Ensures all routes are protected
 * @function
 *
 * @param   {object} req   the server/http(s) request object
 * @param   {object} res  the server/http(s) response object
 * @param   {object} next      the node/express middleware next object
 *
 * @returns {object}
 */
const authToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
  // decode token
  if (token) {
    // verifies token and checks if expired or invalid
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        reqHelper.error(res, 401, 'Authentication failed. Token is invalid or expired');
      }
      req.decoded = decoded;
      next();
    });
  } else {
    reqHelper.error(res, 403, 'Access denied. You are not logged in');
  }
};

export default authToken;
