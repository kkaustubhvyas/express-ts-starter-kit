import * as dotenv from 'dotenv-safe';

export class Configs {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.config({ path: filePath }).parsed || {};
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

const config = new Configs(`${process.env.APP_STAGE || ''}.env`);

export default config;
