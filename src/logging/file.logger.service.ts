import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Injectable()
export class FileLoggerService implements LoggerService {
  private MAX_FILE_SIZE = 1024;
  private currentSize = 0;
  private stream: fs.WriteStream;

  constructor(private configService: ConfigService) {
    this.setFileSize();
    this.createStream();
  }

  private createStream() {
    const fileName = `app-${Date.now()}.log`;
    this.stream = fs.createWriteStream(fileName, { flags: 'a' });
    this.currentSize = 0;
  }

  private write(level: string, message: any, trace?: string) {
    const line = this.formatLine(level, message, trace);
    const lineSize = Buffer.byteLength(line);
    if (this.currentSize + lineSize >= this.MAX_FILE_SIZE) {
      this.stream.end();
      this.createStream();
    }
    this.stream.write(line + '\n');
    this.currentSize += lineSize;
  }

  private formatLine(level: string, message: any, trace?: string) {
    return `[${new Date().toISOString()}] [${level}] ${message}${trace ? `\n${trace}` : ''}`;
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

  private setFileSize(): void {
    const maxSize = this.configService.get<number>('LOG_MAX_SIZE');
    if (maxSize) {
      this.MAX_FILE_SIZE = maxSize * 1024;
    }
  }
}
