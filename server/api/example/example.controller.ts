import { Request, Response, NextFunction } from 'express';
import exampleService from './example.service';
import { HttpStatus } from '../../common/utilities/http-service';
import { ResponseBody } from '../../common/middlewares/response-handler.middleware';

export class ExampleController {
  async get(req: Request, _res: Response, _next: NextFunction): Promise<ResponseBody> {
    const {
      params: { id = '' },
    } = req;
    const result = id ? await exampleService.getExample(id) : await exampleService.getAllExamples();

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }

  async post(req: Request, _res: Response, _next: NextFunction): Promise<ResponseBody> {
    const {
      body: { data = {} },
    } = req;
    const result = await exampleService.createExample(data);

    return {
      status: HttpStatus.CREATED,
      data: result,
    };
  }

  async put(req: Request, _res: Response, _next: NextFunction): Promise<ResponseBody> {
    const {
      params: { id = '' },
      body: { data = {} },
    } = req;
    const result = await exampleService.updateExample(id, data);

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }
}

const exampleController = new ExampleController();
export default exampleController;
