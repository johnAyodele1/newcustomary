import { pool } from '../../shared/db/pool.js';
import type { CreateOrderInput } from './orders.schemas.js';
import type { PricedItem } from './orders.pricing.js';

export async function getProductsForOrder(ids: string[]) {
  const result = await pool.query<{
    id: string; stock: number; variants: Array<{ id: string; price: number }>;
    colors: Array<{ id: string; available: boolean }>;
  }>('SELECT id, stock, variants, colors FROM products WHERE id = ANY($1::uuid[]) FOR SHARE', [ids]);
  return result.rows;
}

export async function createOrder(input: CreateOrderInput, priced: PricedItem[], reference: string, total: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query<{ id: string }>(
      `INSERT INTO orders (reference, full_name, phone, address, city, state, total, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'pending_payment') RETURNING id`,
      [reference, input.customer.fullName, input.customer.phone, input.customer.address, input.customer.city, input.customer.state, total],
    );
    for (const item of priced) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, variant_id, color_id, engraving, quantity, unit_price, line_total)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [result.rows[0].id, item.productId, item.variantId, item.colorId, item.engraving, item.quantity, item.unitPrice, item.lineTotal],
      );
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.productId]);
    }
    await client.query('COMMIT');
    return { id: result.rows[0].id, reference, total, items: priced.length, currency: 'NGN' };
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
}

export async function markPayment(reference: string, status: 'paid' | 'failed') {
  await pool.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE reference = $2', [status, reference]);
}
