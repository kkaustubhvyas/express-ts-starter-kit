import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import installValidator from './openapi';
import logger from './utilities/logger/logger';
import { proxy } from './proxy/proxy.router';
import { authenticate } from './middlewares/authentication.middleware';

const cors = require('cors');
const helmet = require('helmet');
const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');

    app.set('appPath', root + 'client');
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(authenticate());
    proxy(app);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use('/', express.static(`${root}/public/`));
  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(app, routes)

    return this;
  }

  listen(p: string | number): Application {
    const welcome = port => () => logger.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}`);
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
