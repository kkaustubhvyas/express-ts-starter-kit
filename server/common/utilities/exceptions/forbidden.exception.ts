/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from './http-exception';
import { HttpStatus } from '../http-service/http-service.constants';

export class ForbiddenException extends HttpException {
  constructor(message?: string, details?: any) {
    super({
      status: HttpStatus.FORBIDDEN,
      message: message || 'Forbidden',
      details,
    });

    this.name = 'Forbidden';
  }
}
