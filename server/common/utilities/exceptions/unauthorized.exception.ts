import { HttpException } from './http-exceptipn';
import { HttpStatus } from '../http-service/http-service.constants';
export class UnAuthorizedException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Not Authorized'
    })

    this.name = 'Unauthorized';
  }
}