import { NextFunction, Response, Request } from 'express';
import { HttpStatus } from '../utilities/http-service';
import LoggerService from '../utilities/logger/logger';

export type ResponseBody = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  status: HttpStatus;
  message?: string;
  pagination?: {
    pageNo?: string;
    pageSize: string;
    totalRecords?: string;
    totalPages?: string;
  };
};

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<ResponseBody>;

export const controllerWrapper = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let response: ResponseBody;
    let log = `URL: ${req.originalUrl} | `;
    try {
      response = await controller(req, res, next);
      res.contentType('application/json');
      res.status(response.status).json(response);
      log += `STATUS: ${response.status} | MSG: ${response.message}`;
      new LoggerService('Req<-->Res').info(`${log}\n`);
    } catch (e) {
      next(e);
    }
  };
};
