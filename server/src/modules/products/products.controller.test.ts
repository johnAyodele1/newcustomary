import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { productsRouter } from './products.routes.js';

vi.mock('./products.service.js', () => ({ getProducts: vi.fn(async () => []) }));

describe('products controller', () => {
  it('returns a products envelope', async () => {
    const app = express(); app.use('/api/products', productsRouter);
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ products: [] });
  });
});
