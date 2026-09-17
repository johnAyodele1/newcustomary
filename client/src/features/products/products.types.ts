import type { Product } from './products.schemas';

export type ProductSelection = {
  product: Product;
  variantId: string;
  colorId: string;
  engraving: string;
  quantity: number;
  unitPrice: number;
};
