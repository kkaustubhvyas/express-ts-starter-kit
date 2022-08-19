import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utilities/http-service';
import LoggerService from '../utilities/logger/logger';

const getErrorLog = (error: any, request: Request) => {
  return `URL: ${request.originalUrl} | STATUS: ${error.status} | MSG: ${error.message} | STACK: ${
    error.stack || ''
  }\n`;
};

// Error handler to return error in response
export default function errorHandler() {
  const logger = new LoggerService('Error');
  return (error: any, req: Request, response: Response, next: NextFunction) => {
    response.contentType('application/json');
    if (!error) {
      next();
      return;
    }

    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const { message, details, name } = error;

    if (process.env.NODE_ENV === 'production') {
      logger.error(getErrorLog(error, req));
      response.statusMessage = message;
      response.status(status).json({ name, message, status, details });
    } else {
      logger.error(getErrorLog(error, req));
      response.statusMessage = message;
      response.status(status).json({ name, message, status, details, ...error });
    }
  };
}
