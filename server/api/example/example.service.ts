import { Example } from "./example.constants";

export class ExampleSevice {
    
    async getExample(id? : string): Promise<string> {
        if(id){
            return `This is requested Example ID: ${id}`;
        }

        return 'This is an Example';
    }

    async createExample(data: Example): Promise<Example> {
        const { name } = data;

        return {
            id: (Math.random()*10000).toFixed(0),
            name
        }
    }
 }

const exampleService = new ExampleSevice();
export default exampleService;
