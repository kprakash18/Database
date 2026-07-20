import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Production: use Supabase Session Pooler with pgbouncer=true for transaction-mode pooling
// Local dev: falls back to SUPABASE_URI or DATABASE_URL
const connectionString = process.env.SUPABASE_URI || process.env.DATABASE_URL;

// PostgreSQL Pool Connection Instance
// max: cap concurrent connections (Supabase free tier allows ~15-20)
export const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
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