import { pool } from '../../shared/db/pool.js';

export type PaymentOrder = {
  reference: string;
  total: string;
  status: 'pending_payment' | 'paid' | 'failed' | 'fulfilled' | 'cancelled';
};

export async function getOrderForPayment(reference: string): Promise<PaymentOrder> {
  const result = await pool.query<PaymentOrder>(
    'SELECT reference, total, status FROM orders WHERE reference = $1',
    [reference],
  );
  const order = result.rows[0];
  if (!order) throw new Error('Order not found.');
  return order;
}
