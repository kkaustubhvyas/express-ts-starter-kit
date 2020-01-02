import { HttpService, HttpRequestMethod } from "../../utilities/http-service";
import { Request } from "express";
import { BASEURL } from "../../environments/configs/baseurl.environment";
import { UnAuthorizedException } from "../../utilities/exceptions/unauthorized.exception";

export class AuthService {

  private httpService: HttpService;
  private crequest: Request;
  private BASE_URL: string;

  constructor(crequest: Request) {
    this.crequest = crequest;
    this.httpService = new HttpService();
    this.BASE_URL = `${BASEURL.AUTH}/users/`
  }

  async authenticate(token?: string) {
    const auth_token = token || this.crequest.headers.auth_token
    if(!auth_token){
      throw new UnAuthorizedException();
    }
    return {
      auth_token: (Math.random() * 10000).toFixed(0)
    }
  }
}
