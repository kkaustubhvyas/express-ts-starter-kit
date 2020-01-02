import { Request, Response, NextFunction } from 'express';
import exampleService from './example.service';
import { HttpStatus } from '../../common/utilities/http-service';
import { ResponseBody } from '../../common/middlewares/response-handler.middleware';

export class ExampleController {

    async get(req: Request, res: Response, next: NextFunction): Promise<ResponseBody> {
        const { params: { id='' }} = req;
        const result = await exampleService.getExample(id);

        return {
            status: HttpStatus.OK,
            data: result
        }
    }

    async post(req: Request, res: Response, next: NextFunction): Promise<ResponseBody> {
        const { body: { data={} }} = req;
        const result = await exampleService.createExample(data);

        return {
            status: HttpStatus.CREATED,
            data: result
        }
    }
}

const exampleController = new ExampleController();
export default exampleController;
