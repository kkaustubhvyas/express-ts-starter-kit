/* eslint-disable max-len */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpRequestMethod, HttpStatus } from './http-service.constants';
import { HttpException } from '../exceptions/http-exception';
import LoggerService from '../logger/logger';

export type HttpRequest = {
  method: HttpRequestMethod;
  url: string;
  query?: { [key: string]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: { [key: string]: string };
};

export class HttpService {
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService('HttpService');
  }

  async request(request: HttpRequest) {
    const url = `${request.url}`;

    this.logger.info(`Request -> METHOD: ${request.method}, URL: ${url}`, 'TPR');

    try {
      const axiosRequest: AxiosRequestConfig = {
        method: request.method,
        url,
        data: request.data,
        timeout: 1000 * 30,
        headers: {
          ...request.headers,
          'Accept-Encoding': 'gzip,compress,deflate,br,identity,*',
        },
        params: request.query,
      };

      const response = await axios.request(axiosRequest);

      this.logger.info(
        `Request -> METHOD: ${request.method}, URL: ${url} | Response -> STATUS: ${response.status}, MESSAGE: ${response.statusText}`,
        'TPR',
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { code, request: orgRequest, response } = error as unknown as any;
        if (code === 'ECONNABORTED') {
          throw new HttpException({
            message: 'Connection with source timed out!',
            status: HttpStatus.GATEWAY_TIMEOUT,
            path: orgRequest.path,
          });
        } else if (response) {
          const { status, statusText, data = {} } = response;
          const { message, status: responseStatus } = data;
          this.logger.error(
            `Request -> METHOD: ${request.method}, URL: ${url} | Response -> STATUS: ${response.status}, MESSAGE: ${response.statusText}`,
            'TPR',
          );
          throw new HttpException({
            message: message || statusText,
            path: orgRequest.path,
            method: orgRequest.method,
            status: responseStatus || status,
          });
        } else {
          this.logger.error(
            `Request -> METHOD: ${request.method}, URL: ${url} | Error -> CODE: ${error.code}, MESSAGE: ${error.message}`,
            'TPR',
          );
          throw error;
        }
      } else {
        this.logger.error(
          `Request -> METHOD: ${request.method}, URL: ${url} | Error -> CODE: ${(error as any).code}, MESSAGE: ${
            (error as any).message
          }`,
          'TPR',
        );
        throw error;
      }
    }
  }
}

export default new HttpService();
