import express from 'express';
import usersController from '../controllers/users';
import adminController from '../controllers/admin';

const router = express.Router();

router.route('/users/requests')
    .post(usersController.createRequest);
    // .get(usersController.getRequests);

// router.route('/users/requests/:id')
//     .put(usersController.updateRequests)
//     .delete(usersController.deleteRquest)
//     .get(usersController.getsingleRequests);

// router.route('/auth/signup')
//     .post(usersController.userSignup);
// router.route('/auth/login')
//     .post(usersController.userLogin);

export default router;