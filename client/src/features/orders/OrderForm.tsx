import { useState, type FormEvent } from 'react';
import { orderFormSchema, type OrderFormValues } from './orders.schemas';
import { createOrder } from './orders.api';
import type { ProductSelection } from '../products/products.types';
import { OrderSummary } from './OrderSummary';
import { OrderConfirmation } from './OrderConfirmation';

type Props = { items: ProductSelection[]; onDone: () => void };

export function OrderForm({ items, onDone }: Props) {
  const [values, setValues] = useState<OrderFormValues>({ fullName: '', phone: '', address: '', city: '', state: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof OrderFormValues, boolean>>>({});
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ reference: string; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const parsed = orderFormSchema.safeParse(values);
  const update = (field: keyof OrderFormValues, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const messageFor = (field: keyof OrderFormValues) => {
    if (!touched[field]) return null;
    const result = orderFormSchema.shape[field].safeParse(values[field]);
    return result.success ? null : result.error.issues[0]?.message ?? 'Check this field.';
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setTouched({ fullName: true, phone: true, address: true, city: true, state: true }); setError(null);
    if (!parsed.success) return;
    setSubmitting(true);
    try {
      const result = await createOrder(values, items);
      setConfirmation({ reference: result.order.reference, total: result.order.total });
      window.open(result.payment.authorizationUrl, '_blank', 'noopener,noreferrer');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to start payment.'); }
    finally { setSubmitting(false); }
  };
  if (confirmation) return <OrderConfirmation {...confirmation} onContinue={onDone} />;
  return (
    <section className="checkout section" id="checkout">
      <div className="container checkout__layout"><OrderSummary items={items} />
        <form className="checkout-form" onSubmit={submit} noValidate>
          <p className="eyebrow">Delivery & payment</p><h1 className="display">Where should we send it?</h1>
          {(['fullName', 'phone', 'address', 'city', 'state'] as const).map((field) => {
            const label = field === 'phone' ? 'WhatsApp Number Preferred' : field === 'fullName' ? 'Full name' : field[0].toUpperCase() + field.slice(1);
            const message = messageFor(field);
            return <label className="field" key={field}><span>{label}</span>{field === 'address' ? <textarea value={values[field]} onBlur={() => setTouched((c) => ({ ...c, [field]: true }))} onChange={(e) => update(field, e.target.value)} /> : <input value={values[field]} onBlur={() => setTouched((c) => ({ ...c, [field]: true }))} onChange={(e) => update(field, e.target.value)} autoComplete={field === 'phone' ? 'tel' : field === 'fullName' ? 'name' : 'address-level2'} />} {message && <small className="field-error">{message}</small>}</label>;
          })}
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="button button--solid checkout-form__pay" type="submit" disabled={!parsed.success || submitting || items.length === 0}>{submitting ? 'Preparing payment…' : 'Continue to Paystack'}</button>
        </form>
      </div>
    </section>
  );
}
