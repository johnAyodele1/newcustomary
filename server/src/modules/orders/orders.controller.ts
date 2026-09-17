import type { Request, Response } from 'express';
import { createOrderSchema } from './orders.schemas.js';
import { createOrder } from './orders.service.js';
import { initializePayment } from '../payments/payments.service.js';
import { env } from '../../shared/config/env.js';

export async function createOrderController(request: Request, response: Response) {
  const input = createOrderSchema.parse(request.body);
  if (!env.PAYSTACK_SECRET_KEY) throw new Error('Payment is not configured. Add PAYSTACK_SECRET_KEY to .env.');
  const order = await createOrder(input);
  const payment = await initializePayment({ email: env.PAYSTACK_EMAIL, amount: order.total, reference: order.reference });
  return response.status(201).json({ order, payment });
}
