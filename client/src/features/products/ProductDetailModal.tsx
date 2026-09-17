import { useEffect, useRef, useState } from 'react';
import type { Product } from './products.schemas';
import type { ProductSelection } from './products.types';
import { EngravingPlatePreview } from './EngravingPlatePreview';
import { QuantityStepper } from './QuantityStepper';

type Props = {
  product: Product;
  initialVariantId: string;
  initialColorId: string;
  onClose: () => void;
  onAdd: (selection: ProductSelection) => void;
};

const MAX_ENGRAVING = 40;

export function ProductDetailModal({ product, initialVariantId, initialColorId, onClose, onAdd }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement);
  const [variantId, setVariantId] = useState(initialVariantId);
  const [colorId, setColorId] = useState(initialColorId);
  const [engraving, setEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  const selectedColor = product.colors.find((item) => item.id === colorId) ?? product.colors.find((item) => item.available) ?? product.colors[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, input, textarea, [tabindex="0"]');
        if (!focusable.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKey); triggerRef.current?.focus(); };
  }, [onClose]);

  if (!variant || !selectedColor) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" tabIndex={-1} ref={dialogRef}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close product details">×</button>
        <div className="product-modal__image"><img src={product.imageUrl} alt={`${product.altText}, ${variant.name}`} /></div>
        <div className="product-modal__content">
          <p className="eyebrow">{product.category.replace('-', ' ')}</p>
          <h2 id="product-modal-title" className="display">{product.name}</h2>
          <p className="modal-description">{product.description}</p>
          <strong className="price price--large">₦{variant.price.toLocaleString()}</strong>
          <fieldset><legend>Finish</legend><div className="segmented">{product.variants.map((item) => <button type="button" key={item.id} className={item.id === variantId ? 'is-selected' : ''} onClick={() => setVariantId(item.id)}>{item.name}</button>)}</div></fieldset>
          <fieldset><legend>Colour</legend><div className="modal-colours">{product.colors.map((item) => <button type="button" key={item.id} className={`colour-option ${item.id === colorId ? 'is-selected' : ''}`} disabled={!item.available} onClick={() => setColorId(item.id)}>{item.name}{!item.available && ' · unavailable'}</button>)}</div></fieldset>
          <label className="field"><span>What would you like engraved?</span><textarea maxLength={MAX_ENGRAVING} value={engraving} onChange={(event) => setEngraving(Array.from(event.target.value).slice(0, MAX_ENGRAVING).join(''))} placeholder="A name, date or small sentiment" /><small>{Array.from(engraving).length}/{MAX_ENGRAVING}</small></label>
          <EngravingPlatePreview text={engraving} />
          <div className="modal-purchase"><QuantityStepper value={quantity} onChange={setQuantity} /><button className="button button--solid" type="button" onClick={() => onAdd({ product, variantId, colorId: selectedColor.id, engraving, quantity, unitPrice: variant.price })}>Add to Order</button></div>
        </div>
      </div>
    </div>
  );
}
