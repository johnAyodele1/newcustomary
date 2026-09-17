import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
  PAYSTACK_EMAIL: z.string().email().default('payments@customry.local'),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
