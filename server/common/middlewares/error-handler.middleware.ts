import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utilities/http-service';
import logger from '../utilities/logger/logger';

// Error handler to return error in response
export default function errorHandler(error, req: Request, response: Response, next: NextFunction) {

  if (!error) {
    return next()
  }

  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const stack = error.stack;

  if (process.env.NODE_ENV === 'production') {
    logger.error(getErrorLog(error, req));
    response.statusMessage = message;
    response.status(status).json({ message, status });
  } else {
    logger.error(getErrorLog(error, req));
    response.statusMessage = message;
    response.status(status).json({ message, stack, status, ...error });
  }
}

const getErrorLog = (error, request: Request) => {
  return `URL: ${request.originalUrl} | STATUS: ${error.status} | MSG: ${error.message} | STACK: ${error.stack || ''}\n`
}