import type { Request, Response } from 'express';
import { initializePayment, verifyPayment } from './payments.service.js';
import { initializePaymentSchema, verifyPaymentSchema } from './payments.schemas.js';

export async function initializePaymentController(request: Request, response: Response) {
  const input = initializePaymentSchema.parse(request.body);
  return response.json(await initializePayment(input));
}

export async function verifyPaymentController(request: Request, response: Response) {
  const input = verifyPaymentSchema.parse(request.params);
  return response.json(await verifyPayment(input.reference));
}
