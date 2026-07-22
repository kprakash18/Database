import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Production: use Supabase Session Pooler with pgbouncer=true for transaction-mode pooling
// Local dev: falls back to SUPABASE_URI or DATABASE_URL
const connectionString = process.env.SUPABASE_URI || process.env.DATABASE_URL;

// Safety Guard: Stop backend execution immediately if local development points to production Supabase
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction && connectionString && connectionString.includes('supabase')) {
  throw new Error(
    'SAFETY GUARD BLOCKED STARTUP: Local development environment is attempting to connect to a production Supabase instance! ' +
    'Please verify that SUPABASE_URI is commented out or removed from your local .env file.'
  );
}

// PostgreSQL Pool Connection Instance
export const pool = new pg.Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
  idleTimeoutMillis: 30000,      // Close idle connections after 30s
  connectionTimeoutMillis: 5000, // Fail fast if DB is unreachable
});

pool.on('error', (err) => {
  console.error('[pg.Pool] Unexpected client error:', err.message);
});

// Prisma Driver Adapter for PostgreSQL Pool
const adapter = new PrismaPg(pool);

// Prisma Client Instance
export const prisma = new PrismaClient({ adapter });