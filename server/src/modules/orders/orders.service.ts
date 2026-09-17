import { getProductsForOrder, createOrder as persistOrder } from './orders.repository.js';
import { priceOrder } from './orders.pricing.js';
import type { CreateOrderInput } from './orders.schemas.js';
import { orderReference } from '../../shared/utils/reference.js';
import { orderNotifier } from './orders.notifications.js';

export async function createOrder(input: CreateOrderInput) {
  const ids = [...new Set(input.items.map((item) => item.productId))];
  const products = await getProductsForOrder(ids);
  const priced = priceOrder(input, products);
  const reference = orderReference();
  const order = await persistOrder(input, priced.items, reference, priced.total);
  await orderNotifier.sendOrderReceived(reference, input.customer);
  return order;
}
