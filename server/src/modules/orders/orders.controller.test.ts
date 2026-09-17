import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { ordersRouter } from './orders.routes.js';

vi.mock('./orders.service.js', () => ({ createOrder: vi.fn(async () => ({ id: 'id', reference: 'CUS-TEST', total: 1000, items: 1, currency: 'NGN' })) }));
vi.mock('../payments/payments.service.js', () => ({ initializePayment: vi.fn(async () => ({ authorizationUrl: 'https://paystack.com/pay/test', accessCode: 'test', reference: 'CUS-TEST' })) }));

describe('orders controller', () => {
  it('validates the HTTP boundary', async () => {
    const app = express(); app.use(express.json()); app.use('/api/orders', ordersRouter);
    const response = await request(app).post('/api/orders').send({});
    expect(response.status).toBe(400);
  });
});
