import { pool } from '../../shared/db/pool.js';
import type { ProductRecord } from './products.types.js';

type Row = {
  id: string; category: ProductRecord['category']; name: string; description: string;
  base_price: string; stock: number; variants: ProductRecord['variants'];
  colors: ProductRecord['colors']; image_url: string; alt_text: string;
};

export async function listProducts(): Promise<ProductRecord[]> {
  const result = await pool.query<Row>(`
    SELECT id, category, name, description, base_price, stock, variants, colors, image_url, alt_text
    FROM products ORDER BY category, name
  `);
  return result.rows.map((row) => ({
    id: row.id, category: row.category, name: row.name, description: row.description,
    basePrice: Number(row.base_price), stock: row.stock, variants: row.variants,
    colors: row.colors, imageUrl: row.image_url, altText: row.alt_text,
  }));
}
