import { Router } from 'express';
import { createOrderController } from './orders.controller.js';

export const ordersRouter = Router();
ordersRouter.post('/', createOrderController);
