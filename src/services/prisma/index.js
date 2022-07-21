import { PrismaClient } from "@prisma/client";

/**
 * Client de inicialização do Prisma. Chama o
 * Prisma Client e cria um pool de conexão ao BD.
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    //log: ["query"],
  });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
