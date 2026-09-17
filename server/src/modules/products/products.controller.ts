import type { Request, Response } from 'express';
import { productSchema } from './products.schemas.js';
import { getProducts } from './products.service.js';

export async function listProductsController(_request: Request, response: Response) {
  const products = await getProducts();
  return response.json({ products: products.map((product) => productSchema.parse(product)) });
}
