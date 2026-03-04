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
  private level = 3;

  constructor(
    private configService: ConfigService,
    private readonly consoleLogger: ConsoleLogger,
    private readonly fileLogger: FileLoggerService,
  ) {
    this.level = this.configService.get<number>('LOG_LEVELS');
    this.setLogger(this.consoleLogger);
    this.setLogger(this.fileLogger);
  }

  log(message: string) {
    if (this.level > 2) {
      for (const logger of this.loggers) {
        logger.log(message);
      }
    }
  }

  error(message: string, trace?: any) {
    if (this.level > 0) {
      for (const logger of this.loggers) {
        logger.error(message, trace);
      }
    }
  }

  warn(message: string) {
    if (this.level > 1) {
      for (const logger of this.loggers) {
        logger.warn(message);
      }
    }
  }

  debug(message: string) {
    if (this.level > 3) {
      for (const logger of this.loggers) {
        logger.debug(message);
      }
    }
  }

  verbose(message: string) {
    if (this.level > 4) {
      for (const logger of this.loggers) {
        logger.verbose(message);
      }
    }
  }

  setLogLevels?(levels: LogLevel[]) {
    this.logLevels = levels;
  }

  setLogger(logger: LoggerService) {
    this.loggers.push(logger);
  }

  private parseLevels(levels: string): LogLevel[] {
    return levels
      .split(',')
      .map((l) => l.trim())
      .join('') as unknown as LogLevel[];
  }
}
