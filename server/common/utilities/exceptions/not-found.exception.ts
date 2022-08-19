/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from './http-exception';
import { HttpStatus } from '../http-service/http-service.constants';

export class NotFoundException extends HttpException {
  name = 'Not Found';

  constructor(message?: string, details?: any) {
    super({
      status: HttpStatus.NOT_FOUND,
      message: message || 'Not Found',
      details,
    });
  }
}
