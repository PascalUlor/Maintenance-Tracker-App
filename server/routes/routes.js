import express from 'express';
import validation from '../middleware/validation';
import requestController from '../controllers/requests';

const router = express.Router();

router.route('/users/requests')
    .post(validation.createRequestValidation, requestController.createRequest)
    .get(requestController.getAllRequests);

router.route('/users/requests/:id')
    .put(validation.createRequestValidation, requestController.updateRequests)
    .get(requestController.getSingleRequest);

export default router;
