import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import reqHelper from './reqHelper';

dotenv.config();

const createToken = (req, res, statusCode, message, result) => {
  const payload = { fullName: result.rows[0].fullname, userId: result.rows[0].id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 1440
  });
  const logInfo = {
    user: {
      id: result.rows[0].id,
      fullName: result.rows[0].fullname,
      email: result.rows[0].email
    },
    token
  };
  reqHelper.success(res, statusCode, message, logInfo);
};

export default createToken;
