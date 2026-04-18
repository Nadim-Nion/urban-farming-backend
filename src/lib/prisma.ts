// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create pg pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create adapter
const adapter = new PrismaPg(pool);

// Pass adapter to Prisma
const prisma = new PrismaClient({
  adapter,
});

export default prisma;
