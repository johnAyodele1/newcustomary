import { listProducts } from './products.repository.js';

export function getProducts() {
  return listProducts();
}
