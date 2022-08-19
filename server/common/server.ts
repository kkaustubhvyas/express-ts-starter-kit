import express, { Application } from 'express';
import http from 'http';
import os from 'os';
import openapi from './openapi';
import { authenticate } from './middlewares/authentication.middleware';
import { setupSecurity } from './middlewares/security.middleware';
import setupRoutes from '../routes';
import errorHandler from './middlewares/error-handler.middleware';
import LoggerService from './utilities/logger/logger';
import databaseHandler from '../database';

const app = express();

export default class ExpressServer {
  async setup(p: string | number): Promise<ExpressServer> {
    openapi(app);
    setupSecurity(app);
    app.use(authenticate());
    setupRoutes(app);
    app.use(errorHandler());
    databaseHandler.connect();
    databaseHandler.init();
    databaseHandler.sync();
    this.listen(p);
    return this;
  }

  listen(p: string | number): Application {
    const welcome = (port: string | number) => () => {
      const logger = new LoggerService('APP');
      logger.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}`);
      logger.debug('* DEBUG LOGS ENABLED *');
    };
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
