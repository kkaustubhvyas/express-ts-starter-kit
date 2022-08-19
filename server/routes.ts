import { Application, NextFunction, Request, Response } from 'express';
import apiRoutes from './api/api.routes';

export default function setupRoutes(app: Application): void {
  app.use('/api', apiRoutes);
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.contentType('application/json');
    next();
  });
}
