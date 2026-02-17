import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const server = express();
let isReady = false;

async function bootstrap() {
  if (!isReady) {
    const adapter = new ExpressAdapter(server);
    const app = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn'],
    });

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
      }),
    );

    app.setGlobalPrefix('api');
    await app.init();
    isReady = true;
  }
  return server;
}

module.exports = async (req: any, res: any) => {
  try {
    const expressApp = await bootstrap();
    expressApp(req, res);
  } catch (err) {
    console.error('Bootstrap error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
