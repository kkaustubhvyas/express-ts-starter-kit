import { Application } from 'express';
import apiRoutes from './api/api.routes';
import logger from './common/utilities/logger/logger';
export default function routes(app: Application): void {
  app.use('/api', apiRoutes);
};