import { HttpException } from './http-exceptipn';
import { HttpStatus } from '../http-service/http-service.constants';
export class ForbiddenException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.FORBIDDEN,
      message: 'Forbidden'
    })

    this.name = 'Forbidden';
  }
}