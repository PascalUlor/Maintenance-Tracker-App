import express from 'express';
import requestController from '../controllers/requests';

const router = express.Router();

router.route('/users/requests')
    .post(requestController.createRequest)
    .get(requestController.getAllRequests);

router.route('/users/requests/:id')
    .put(requestController.updateRequests)
    .get(requestController.getSingleRequest);

export default router;
