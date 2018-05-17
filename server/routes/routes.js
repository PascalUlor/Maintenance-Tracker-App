import express from 'express';
import requestController from '../controllers/requests';

const router = express.Router();

router.route('/users/requests')
    .post(requestController.createRequest)
    .get(requestController.getAllRequests);

// router.route('/users/requests/:id')
//     .put(requestController.updateRequests)
//     .delete(requestController.deleteRquest)
//     .get(requestController.getsingleRequests);

// router.route('/auth/signup')
//     .post(usersController.userSignup);
// router.route('/auth/login')
//     .post(usersController.userLogin);

export default router;
