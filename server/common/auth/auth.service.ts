import { Request } from 'express';
import { HttpService } from '../utilities/http-service';
import { UnAuthorizedException } from '../utilities/exceptions/unauthorized.exception';

export class AuthService {
  private httpService: HttpService;

  private req: Request;

  constructor(req: Request) {
    this.req = req;
    this.httpService = new HttpService();
  }

  async authenticate(token?: string) {
    const auth_token = token || this.req.headers.auth_token;
    if (!auth_token) {
      throw new UnAuthorizedException();
    }
    return {
      auth_token: (Math.random() * 10000).toFixed(0),
    };
  }
}
