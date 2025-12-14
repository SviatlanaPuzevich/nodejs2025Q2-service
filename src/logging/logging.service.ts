import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { FileLoggerService } from './file.logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevels: LogLevel[] = ['log', 'warn', 'error'];
  private loggers: LoggerService[] = [];

  constructor(
    private configService: ConfigService,
    private readonly consoleLogger: ConsoleLogger,
    private readonly fileLogger: FileLoggerService,
  ) {
    this.loggers.push(consoleLogger);
    this.loggers.push(fileLogger);
  }

  log(message: string) {
    for (const logger of this.loggers) {
      logger.log(message);
    }
  }

  error(message: string, trace?: any) {
    for (const logger of this.loggers) {
      logger.error(message, trace);
    }
  }

  warn(message: string) {
    for (const logger of this.loggers) {
      logger.warn(message);
    }
  }

  debug(message: string) {
    for (const logger of this.loggers) {
      logger.debug(message);
    }
  }

  verbose(message: string) {
    for (const logger of this.loggers) {
      logger.verbose(message);
    }
  }

  setLogLevels?(levels: LogLevel[]) {
    this.logLevels = levels;
  }
}
