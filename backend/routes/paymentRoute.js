import express from 'express'
import { esewaFailure, esewaSuccess } from '../controllers/paymentController.js';
import userAuth from '../middleware/userAuth.js';
const paymentRouter = express.Router();

paymentRouter.get('/esewa/success',esewaSuccess)
paymentRouter.get('/esewa/failure',esewaFailure)

export default paymentRouter;