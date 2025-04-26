import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverlessExpress from 'aws-serverless-express';
import * as cookieParser from 'cookie-parser';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();
    expressApp.use(cookieParser());

    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors({ origin: process.env.ORIGIN, credentials: true });
    await app.init();

    const server = serverlessExpress.createServer(expressApp);
    cachedServer = (event: any, context: Context, callback: Callback) => {
      return serverlessExpress.proxy(server, event, context);
    };
  }
  return cachedServer;
}

export const handler: Handler = async (event, context, callback) => {
  const server = await bootstrapServer();
  return server(event, context, callback);
};