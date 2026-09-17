import { env } from '../../shared/config/env.js';
import { markPayment } from '../orders/orders.repository.js';
import { getOrderForPayment } from './payments.repository.js';

type PaystackResponse = {
  status: boolean;
  message: string;
  data?: { authorization_url: string; access_code: string; reference: string };
};

export async function initializePayment(reference: string) {
  if (!env.PAYSTACK_SECRET_KEY) throw new Error('Payment is not configured. Add PAYSTACK_SECRET_KEY to .env.');

  const order = await getOrderForPayment(reference);
  if (order.status !== 'pending_payment') throw new Error('This order is no longer awaiting payment.');

  const amount = Math.round(Number(order.total) * 100);
  if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Order total is invalid for payment.');

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: env.PAYSTACK_EMAIL, amount, reference: order.reference, currency: 'NGN' }),
  });
  const data = (await response.json()) as PaystackResponse;
  if (!response.ok || !data.status || !data.data) throw new Error(data.message || 'Paystack could not initialize payment.');
  return { authorizationUrl: data.data.authorization_url, accessCode: data.data.access_code, reference: data.data.reference };
}

export async function verifyPayment(reference: string) {
  if (!env.PAYSTACK_SECRET_KEY) throw new Error('Payment is not configured.');
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
  });
  const data = (await response.json()) as { status: boolean; message: string; data?: { status: string; reference: string } };
  if (!response.ok || !data.status || !data.data) throw new Error(data.message || 'Payment verification failed.');
  const status = data.data.status === 'success' ? 'paid' : 'failed';
  await markPayment(data.data.reference, status);
  return { reference: data.data.reference, status };
}
