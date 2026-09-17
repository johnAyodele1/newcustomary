import { describe, expect, it, vi } from 'vitest';

vi.mock('./orders.repository.js', () => ({ getProductsForOrder: vi.fn(async () => []), createOrder: vi.fn() }));
vi.mock('./orders.notifications.js', () => ({ orderNotifier: { sendOrderReceived: vi.fn() } }));

describe('orders service', () => {
  it('has a dedicated business-layer module', async () => {
    const module = await import('./orders.service.js');
    expect(typeof module.createOrder).toBe('function');
  });
});
