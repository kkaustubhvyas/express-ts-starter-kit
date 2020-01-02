import { HttpException } from './http-exceptipn';
import { HttpStatus } from '../http-service/http-service.constants';
export class BadRequestException extends HttpException {
  constructor(message: string) {
    super({
      status: HttpStatus.BAD_REQUEST,
      message: message
    })

    this.name = 'Bad Request';
  }
}