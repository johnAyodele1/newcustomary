import type { ProductSelection } from '../products/products.types';

export function OrderSummary({ items }: { items: ProductSelection[] }) {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return (
    <aside className="order-summary">
      <p className="eyebrow">Your selection</p><h2 className="display">Order summary</h2>
      {items.map((item) => <div className="summary-item" key={`${item.product.id}-${item.variantId}-${item.colorId}`}>
        <div className="summary-item__thumb"><img src={item.product.imageUrl} alt={`${item.product.name}, ${item.variantId}`} /></div>
        <div><strong>{item.product.name}</strong><span>{item.variantId} · {item.product.colors.find((c) => c.id === item.colorId)?.name}</span>{item.engraving && <span>“{item.engraving}”</span>}<span>Qty {item.quantity}</span></div>
        <b className="price">₦{(item.unitPrice * item.quantity).toLocaleString()}</b>
      </div>)}
      <div className="summary-total"><span>Total</span><strong className="price">₦{total.toLocaleString()}</strong></div>
    </aside>
  );
}
