import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { dump } from 'js-yaml';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  writeFileSync('./doc/api.yaml', dump(document));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error(
      'Unhandled promise rejection',
      reason?.stack ?? String(reason),
    );
  });

  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on: http://0.0.0.0:${port}`);
}

bootstrap();
