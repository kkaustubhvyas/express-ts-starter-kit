import { NextFunction, Response, Request } from 'express';
import { HttpStatus } from '../utilities/http-service';
import logger from '../utilities/logger/logger';

export type ResponseBody = {
  data: any;
  status: HttpStatus;
  message?: string;
  pagination?: {
    pageNo?: string;
    pageSize: string;
    totalRecords?: string;
    totalPages?: string;
  }
}

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<ResponseBody>

export const controllerWrapper = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let response: ResponseBody;
    let log: string = `URL: ${req.originalUrl} | `
    try {
      res.header('auth_token', req.headers.auth_token)
      response = await controller(req, res, next)
      res.status(response.status).json(response);
      log += `STATUS: ${response.status} | MSG: ${response.message}`;
      logger.info(`${log}\n`);
    } catch (e) {
      next(e)
    }
  }
}