import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { initDatabase } from './init';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Uncomment to get request logs
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log("✅ Prisma successfully connected to the database.");
      
      await initDatabase();
      console.log("⚡ Database policies and triggers successfully initialized.");
    } catch (error) {
      console.error('❌ Failed to connect to the database:', error.message);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Prisma disconnected from the database.');
  }
}
