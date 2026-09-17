import type { Request, Response } from 'express';
import { createOrderSchema } from './orders.schemas.js';
import { createOrder } from './orders.service.js';
import { initializePayment } from '../payments/payments.service.js';

export async function createOrderController(request: Request, response: Response) {
  const input = createOrderSchema.parse(request.body);
  const order = await createOrder(input);
  const payment = await initializePayment(order.reference);
  return response.status(201).json({ order, payment });
}
