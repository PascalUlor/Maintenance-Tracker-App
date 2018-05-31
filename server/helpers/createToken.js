import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import reqHelper from './requestHelper';

dotenv.config();

const createToken = (res, statusCode, message, result) => {
  const user = {
    userId: result.rows[0].id,
    fullName: result.rows[0].firstname + result.rows[0].lastname,
    email: result.rows[0].email,
    role: result.rows[0].role,
  };
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 1440,
  });
  const logInfo = {
    user,
    token,
  };
  reqHelper.success(res, statusCode, message, logInfo);
};

export default createToken;
