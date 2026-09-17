import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { paymentsRouter } from './payments.routes.js';

vi.mock('./payments.service.js', () => ({
  initializePayment: vi.fn(async (reference: string) => ({ authorizationUrl: 'https://paystack.com/pay/test', accessCode: 'x', reference })),
  verifyPayment: vi.fn(async (reference: string) => ({ reference, status: 'paid' })),
}));

describe('payments controller', () => {
  it('rejects initialization without an order reference', async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/payments', paymentsRouter);

    const response = await request(app).post('/api/payments/initialize').send({ amount: 100 });
    expect(response.status).toBe(400);
  });

  it('initializes payment from an order reference', async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/payments', paymentsRouter);

    const response = await request(app).post('/api/payments/initialize').send({ reference: 'CUS-TEST' });
    expect(response.status).toBe(200);
    expect(response.body.reference).toBe('CUS-TEST');
  });
});
