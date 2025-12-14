import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Injectable()
export class FileLoggerService implements LoggerService {
  constructor(private configService: ConfigService) {}

  private stream = fs.createWriteStream('app.log', { flags: 'a' });

  private write(level: string, message: any, trace?: string) {
    const line = `[${new Date().toISOString()}] [${level}] ${message}${trace ? `\n${trace}` : ''}`;
    this.stream.write(line + '\n');
  }

  log(message: string) {
    this.write('LOG', message);
  }

  error(message: string, trace?: string) {
    this.write('ERROR', message, trace);
  }

  warn(message: string) {
    this.write('WARN', message);
  }

  debug(message: string) {
    this.write('DEBUG', message);
  }
}
