import axios, { AxiosRequestConfig } from 'axios';
import { HttpRequestMethod, HttpStatus } from './http-service.constants';
import { createQueryString } from '../helpers';
import { HttpModuleLogger } from '../logger/logger';
// import { HttpException } from '../exceptions/base.exception';
import { HttpException } from '../exceptions/http-exceptipn';

export type HttpRequest = {
  method: HttpRequestMethod;
  url: string;
  query?: any;
  data?: any;
  headers?: any;
}

export class HttpService {

  private logger: any;

  constructor() {
    this.logger = HttpModuleLogger
  }

  async request(request: HttpRequest) {

    // const requestToken = request.headers ? request.headers['auth_token'] || '' : '';

    const queryString = createQueryString(request.query);

    const url = `${request.url}${queryString}`;

    this.logger.info(`Request -> METHOD: ${request.method}, URL: ${url}`, 'TPR');

    try {
      const axiosRequest: AxiosRequestConfig = {
        method: request.method,
        url: url,
        data: request.data,
        timeout: 1000 * 30,
        headers: {
          ...request.headers,
          'Accept-Encoding': 'gzip,compress,deflate,br,identity,*'
        },
      };

      const response = await axios.request(axiosRequest);

      this.logger.info(`Request -> METHOD: ${request.method}, URL: ${url} | Response -> STATUS: ${response.status}, MESSAGE: ${response.statusText}`, 'TPR');

      return response.data
    } catch (error) {
      const { code, request: orgRequest, response, stack } = error
      if (code === 'ECONNABORTED') {
        throw new HttpException({
          message: 'Connection with source timed out!',
          status: HttpStatus.GATEWAY_TIMEOUT,
          path: orgRequest.path
        })
      } else if (response) {
        const { status, statusText, data = {} } = response
        const { message, status: responseStatus, error } = data
        this.logger.error(`Request -> METHOD: ${request.method}, URL: ${url} | Response -> STATUS: ${response.status}, MESSAGE: ${response.statusText}`, 'TPR');
        throw new HttpException({
          message: message || statusText,
          path: orgRequest.path,
          method: orgRequest.method,
          status: responseStatus || status
        });
      } else {
        this.logger.error(`Request -> METHOD: ${request.method}, URL: ${url} | Error -> CODE: ${error.code}, MESSAGE: ${error.message}`, 'TPR');
        throw error;
      }
    }

  }

}

export default new HttpService();