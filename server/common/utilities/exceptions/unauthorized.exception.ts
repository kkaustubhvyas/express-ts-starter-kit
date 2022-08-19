/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from './http-exception';
import { HttpStatus } from '../http-service/http-service.constants';

export class UnAuthorizedException extends HttpException {
  name = 'Unauthorized';

  constructor(message?: string, details?: any) {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: message || 'Not Authorized',
      details,
    });
  }
}
