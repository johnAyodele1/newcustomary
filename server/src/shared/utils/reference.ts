import crypto from 'node:crypto';

export function orderReference(): string {
  return `CUS-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}
