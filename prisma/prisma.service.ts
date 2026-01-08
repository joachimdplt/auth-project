import { Injectable} from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // ✅ Vérification que DATABASE_URL existe
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in .env file');
    }
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
    super({ adapter });
  }
}