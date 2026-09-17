type Props = { reference: string; total: number; onContinue: () => void };

export function OrderConfirmation({ reference, total, onContinue }: Props) {
  return (
    <section className="confirmation">
      <p className="eyebrow">Order received</p>
      <h1 className="display">A personal piece is on its way.</h1>
      <p>We have your order. Keep this reference for your delivery conversation.</p>
      <div className="confirmation__ref"><span>Order reference</span><strong>{reference}</strong><span>Total · ₦{total.toLocaleString()}</span></div>
      <button className="button button--outline" type="button" onClick={onContinue}>Back to collection</button>
    </section>
  );
}
