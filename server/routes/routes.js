import express from 'express';
import userController from '../controllers/users';
import requestController from '../controllers/requests';
import adminController from '../controllers/admin';
import verify from '../middleware/userValidation';
import validation from '../middleware/validation';

const router = express.Router();

router.route('/users/requests')
  .post(validation.createRequestValidation, requestController.createRequest)
  .get(requestController.getAllRequests);

router.route('/users/requests/:id')
  .put(validation.createRequestValidation, requestController.updateRequests)
  .delete(requestController.deleteRequest)
  .get(requestController.getSingleRequest);

router.route('/users/auth/signup')
  .post(verify.checkUser, userController.userSignup);
router.route('/users/auth/login')
  .post(userController.userLogin);

router.route('/admin/users/:id/requests')
  .get(adminController.getUserRequest);

export default router;
