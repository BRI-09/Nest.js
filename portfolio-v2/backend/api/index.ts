import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import * as express from 'express';

const server = express();
let app: any;

async function bootstrap() {
  if (!app) {
    const adapter = new ExpressAdapter(server);
    app = await NestFactory.create(AppModule, adapter, { logger: false });
    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    await app.init();
  }
  return server;
}

export default async (req: any, res: any) => {
  const expressApp = await bootstrap();
  expressApp(req, res);
};
