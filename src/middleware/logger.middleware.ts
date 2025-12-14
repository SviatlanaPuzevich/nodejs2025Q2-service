import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `STATUS_CODE: ${res.statusCode} URL: ${req.url} QUERY: ${req.query}  BODY: ${req.body}`;
    res.on('finish', () => {
      this.loggingService.log(logMessage);
    });
    next();
  }
}
