import type { Product } from './products.schemas';

type Props = {
  product: Product;
  variantId: string;
  colorId: string;
  onVariantChange: (id: string) => void;
  onColorChange: (id: string) => void;
  onOpen: () => void;
};

export function ProductCard({ product, variantId, colorId, onVariantChange, onColorChange, onOpen }: Props) {
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  const unavailable = product.stock === 0;
  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  if (!variant || !color) return null;

  return (
    <article className={`product-card${unavailable ? ' product-card--oos' : ''}`}>
      <button className="product-card__media" type="button" onClick={onOpen} aria-label={`View ${product.name}`}>
        <img src={product.imageUrl} alt={`${product.altText}, ${variant.name}`} />
        {unavailable && <span className="product-card__oos">Currently unavailable</span>}
      </button>
      <div className="product-card__body">
        <button className="product-card__name display" type="button" onClick={onOpen}>{product.name}</button>
        <div className="product-card__meta"><span>{product.description}</span><strong key={variant.id} className="price price--fade">₦{variant.price.toLocaleString()}</strong></div>
        <div className="selector-group">
          <span className="selector-label">Finish</span>
          <div className="segmented" role="group" aria-label={`${product.name} finish`}>
            {product.variants.map((item) => <button key={item.id} type="button" className={item.id === variant.id ? 'is-selected' : ''} onClick={() => onVariantChange(item.id)} disabled={unavailable}>{item.name}</button>)}
          </div>
        </div>
        <div className="selector-group">
          <span className="selector-label">Colour</span>
          <div className="swatches" role="group" aria-label={`${product.name} colour`}>
            {product.colors.map((item) => <button key={item.id} type="button" aria-label={item.name} title={item.name} className={`swatch ${item.id === color.id ? 'is-selected' : ''} ${!item.available ? 'is-unavailable' : ''}`} onClick={() => onColorChange(item.id)} disabled={!item.available || unavailable}><span /></button>)}
          </div>
        </div>
        <button className="button button--outline product-card__cta" type="button" onClick={onOpen} disabled={unavailable}>{unavailable ? 'Unavailable' : 'Personalise'}</button>
      </div>
    </article>
  );
}
