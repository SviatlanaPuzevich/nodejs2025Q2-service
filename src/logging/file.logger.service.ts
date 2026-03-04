import { Injectable, LoggerService, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Injectable()
export class FileLoggerService implements LoggerService, OnModuleDestroy {
  private MAX_FILE_SIZE = 1024;
  private currentSize = 0;
  private errorCurrentSize = 0;
  private stream: fs.WriteStream;
  private errorStream: fs.WriteStream;

  constructor(private configService: ConfigService) {
    this.setFileSize();
    this.createStream();
    this.createErrorStream();
  }

  private createStream() {
    const fileName = `app-${Date.now()}.log`;
    this.stream = fs.createWriteStream(fileName, { flags: 'a' });
    this.currentSize = 0;
  }

  private createErrorStream() {
    const fileName = `app-errors-${Date.now()}.log`;
    this.errorStream = fs.createWriteStream(fileName, { flags: 'a' });
    this.errorCurrentSize = 0;
  }

  private write(
    stream: fs.WriteStream,
    sizeTracker: 'current' | 'error',
    level: string,
    message: any,
    trace?: string,
  ) {
    const line = this.formatLine(level, message, trace);
    const lineSize = Buffer.byteLength(line);
    const currentSize =
      sizeTracker === 'current' ? this.currentSize : this.errorCurrentSize;

    if (currentSize + lineSize >= this.MAX_FILE_SIZE) {
      stream.end();
      if (sizeTracker === 'current') {
        this.createStream();
      } else {
        this.createErrorStream();
      }
      stream = sizeTracker === 'current' ? this.stream : this.errorStream;
    }

    stream.write(line + '\n');
    if (sizeTracker === 'current') {
      this.currentSize += lineSize;
    } else {
      this.errorCurrentSize += lineSize;
    }
  }

  private formatLine(level: string, message: any, trace?: string) {
    return `[${new Date().toISOString()}] [${level}] ${message}${trace ? `\n${trace}` : ''}`;
  }

  log(message: string) {
    this.write(this.stream, 'current', 'LOG', message);
  }

  error(message: string, trace?: string) {
    this.write(this.errorStream, 'error', 'ERROR', message, trace);
  }

  warn(message: string) {
    this.write(this.stream, 'current', 'WARN', message);
  }

  debug(message: string) {
    this.write(this.stream, 'current', 'DEBUG', message);
  }

  verbose(message: string) {
    this.write(this.stream, 'current', 'VERBOSE', message);
  }

  private setFileSize(): void {
    const maxSize = this.configService.get<number>('LOG_MAX_SIZE');
    if (maxSize) {
      this.MAX_FILE_SIZE = maxSize * 1024;
    }
  }

  onModuleDestroy() {
    if (this.stream) {
      this.stream.end();
    }
    if (this.errorStream) {
      this.errorStream.end();
    }
  }
}
