import { useState } from 'react';
import type { Product } from './products.schemas';
import type { ProductSelection } from './products.types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

type Props = { products: Product[]; onAdd: (selection: ProductSelection) => void };

export function ProductGrid({ products, onAdd }: Props) {
  const [active, setActive] = useState<Product | null>(null);
  const [variantIds, setVariantIds] = useState<Record<string, string>>({});
  const [colorIds, setColorIds] = useState<Record<string, string>>({});

  if (!products.length) return <div className="quiet-state">Nothing is available in this collection yet.</div>;

  return (
    <>
      <div className="collection-grid">
        {products.map((product) => {
          const variantId = variantIds[product.id] ?? product.variants[0]?.id;
          const colorId = colorIds[product.id] ?? product.colors.find((item) => item.available)?.id ?? product.colors[0]?.id;
          if (!variantId || !colorId) return null;
          return <ProductCard key={product.id} product={product} variantId={variantId} colorId={colorId}
            onVariantChange={(id) => setVariantIds((current) => ({ ...current, [product.id]: id }))}
            onColorChange={(id) => setColorIds((current) => ({ ...current, [product.id]: id }))}
            onOpen={() => setActive(product)} />;
        })}
      </div>
      {active && <ProductDetailModal product={active}
        initialVariantId={variantIds[active.id] ?? active.variants[0]?.id ?? ''}
        initialColorId={colorIds[active.id] ?? active.colors.find((item) => item.available)?.id ?? active.colors[0]?.id ?? ''}
        onClose={() => setActive(null)}
        onAdd={(selection) => { onAdd(selection); setActive(null); }} />}
    </>
  );
}
