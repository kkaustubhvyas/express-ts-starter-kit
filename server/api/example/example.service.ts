import { NotFoundException } from '../../common/utilities/exceptions/not-found.exception';
import { Example } from './example.types';

export class ExampleSevice {
  async getAllExamples(): Promise<Example[]> {
    return [
      {
        id: 1,
        name: 'This is an Example',
      },
    ];
  }

  async getExample(id?: string): Promise<Example> {
    if (id === '1') {
      return {
        id,
        name: `This is requested Example ID: ${id}`,
      };
    }

    throw new NotFoundException('Example not found');
  }

  async createExample(data: Example): Promise<Example> {
    const { name } = data;

    return {
      id: (Math.random() * 10000).toFixed(0),
      name,
    };
  }

  async updateExample(id: string, data: Partial<Example>) {
    const example = this.getExample(id);
    return {
      id,
      ...example,
      ...data,
    };
  }
}

const exampleService = new ExampleSevice();
export default exampleService;
