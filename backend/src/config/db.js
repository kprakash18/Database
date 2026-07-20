import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.SUPABASE_URI || process.env.DATABASE_URL;

// PostgreSQL Pool Connection Instance
export const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Prisma Driver Adapter for PostgreSQL Pool
const adapter = new PrismaPg(pool);

// Prisma Client Instance
export const prisma = new PrismaClient({ adapter });