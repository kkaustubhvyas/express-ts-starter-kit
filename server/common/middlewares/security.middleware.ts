import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export function setupSecurity(app: Application) {
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
}
