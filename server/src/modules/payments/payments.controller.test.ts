import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { paymentsRouter } from './payments.routes.js';

vi.mock('./payments.service.js', () => ({
  initializePayment: vi.fn(async () => ({ authorizationUrl: 'https://paystack.com/pay/test', accessCode: 'x', reference: 'CUS-TEST' })),
  verifyPayment: vi.fn(async (reference: string) => ({ reference, status: 'paid' })),
}));

describe('payments controller', () => {
  it('rejects malformed initialization input', async () => {
    const app = express(); app.use(express.json()); app.use('/api/payments', paymentsRouter);
    const response = await request(app).post('/api/payments/initialize').send({ amount: 0 });
    expect(response.status).toBe(400);
  });
});
