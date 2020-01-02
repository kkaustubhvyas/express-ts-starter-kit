import { HttpException } from './http-exceptipn';
import { HttpStatus } from '../http-service/http-service.constants';
export class NotFoundException extends HttpException {
  constructor(message: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      message: message
    })

    this.name = 'Not Found';
  }
}