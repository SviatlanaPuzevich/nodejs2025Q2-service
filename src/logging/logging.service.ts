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
    const levels = this.configService.get<string>('LOG_LEVELS');
    this.setLogger(this.consoleLogger);
    this.setLogger(this.fileLogger);
    this.setLogLevels(this.parseLevels(levels));
  }

  log(message: string) {
    if (this.logLevels.includes('log')) {
      for (const logger of this.loggers) {
        logger.log(message);
      }
    }
  }

  error(message: string, trace?: any) {
    if (this.logLevels.includes('error')) {
      for (const logger of this.loggers) {
        logger.error(message, trace);
      }
    }
  }

  warn(message: string) {
    if (this.logLevels.includes('warn')) {
      for (const logger of this.loggers) {
        logger.warn(message);
      }
    }
  }

  debug(message: string) {
    if (this.logLevels.includes('debug')) {
      for (const logger of this.loggers) {
        logger.debug(message);
      }
    }
  }

  verbose(message: string) {
    if (this.logLevels.includes('verbose')) {
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
