/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, HttpRequestMethod } from '../http-service';

interface HttpErrorFormat {
  status: HttpStatus;
  message: string;
  path?: string;
  method?: HttpRequestMethod;
  details?: any;
}

export class HttpException extends Error implements HttpErrorFormat {
  status: HttpStatus;

  path?: string;

  method?: HttpRequestMethod;

  details?: any;

  constructor(error: HttpErrorFormat) {
    super(error.message);
    this.status = error.status;
    this.name = this.constructor.name;
    this.method = error.method;
    this.path = error.path;
    this.details = error.details;
  }
}
