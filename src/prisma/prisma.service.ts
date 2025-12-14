import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private configService: ConfigService,
    private logger: LoggingService,
  ) {
    const connString = configService.get<string>('DATABASE_URL');
    const adapter = new PrismaPg({
      connectionString: connString,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
