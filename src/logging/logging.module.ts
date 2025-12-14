import { Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { FileLoggerService } from './file.logger.service';
import { ConsoleLogger } from '@nestjs/common';

@Global()
@Module({
  providers: [ConsoleLogger, FileLoggerService, LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
