import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Configs {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

export default new Configs(`${process.env.APP_STAGE || ''}.env`);