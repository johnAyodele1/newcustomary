import { Router } from 'express';
import { initializePaymentController, verifyPaymentController } from './payments.controller.js';

export const paymentsRouter = Router();
paymentsRouter.post('/initialize', initializePaymentController);
paymentsRouter.get('/verify/:reference', verifyPaymentController);
