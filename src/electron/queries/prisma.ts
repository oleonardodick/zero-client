import { PrismaClient } from '@prisma/client';
import { isDev } from '../util.js';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Útil para debugging
  });

if (isDev()) globalForPrisma.prisma = prisma;
