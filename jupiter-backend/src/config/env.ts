import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5026').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().optional().default('postgresql://postgres:postgres@localhost:5432/jupiter_db'),
  FRONTEND_URL: z.string().default('http://localhost:3026'),
  CORS_ORIGINS: z.string().optional().default(''),
  JWT_SECRET: z.string().default('jupiter_auth_jwt_secure_secret_token_2026'),
  ADMIN_USERNAME: z.string().optional().default('Jupiterindustries'),
  ADMIN_EMAIL: z.string().optional().default('admin@jupiter.com'),
  ADMIN_PASSWORD: z.string().optional().default('Jupiter@2026'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
