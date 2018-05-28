import express from 'express';
import authToken from '../middleware/authToken';
import userController from '../controllers/users';
import requestController from '../controllers/requests';
import adminController from '../controllers/admin';
import verify from '../middleware/userValidation';
import validation from '../middleware/validation';

const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// User
router.route('/users/requests')
  .post(authToken, validation.createRequestValidation, requestController.createRequest)
  .get(authToken, requestController.getAllRequestsUser);

router.route('/users/requests/:requestId')
  .put(authToken, validation.updateRequestValidation, requestController.updateRequests)
  .delete(requestController.deleteRequest)
  .get(authToken, requestController.getUserSingleRequests);

router.route('/auth/signup')
  .post(verify.checkUser, userController.userSignup);
router.route('/auth/login')
  .post(userController.userLogin);

// Admin
router.route('/requests/:id')
  .get(adminController.getUserRequest);

router.route('/requests')
  .get(adminController.getAllRequests);

router.route('/requests/:requestId/approve')
  .put(adminController.approveRequests);

export default router;
