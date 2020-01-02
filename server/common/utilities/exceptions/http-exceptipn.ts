import { HttpStatus, HttpRequestMethod } from "../http-service";

interface HttpErrorFormat {
  status: HttpStatus;
  stack?: string;
  message: string;
  path?: string;
  method?: HttpRequestMethod;
}

export class HttpException extends Error implements HttpErrorFormat {

  status: HttpStatus;
  path?: string;
  method?: HttpRequestMethod;

  constructor(error: HttpErrorFormat) {
    super(error.message)
    this.status = error.status;
    this.stack = error.stack;
    this.name = this.constructor.name;
    this.method = error.method;
    this.path = error.path;
  }
}