import { Sequelize, SyncOptions } from 'sequelize';
import environments from './common/environments';
import LoggerService from './common/utilities/logger/logger';
import * as Models from './models/index';

// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize;

if (environments.REPLICATION === '1') {
  sequelize = new Sequelize(environments.DATABASE, environments.USERNAME, environments.PASSWORD, {
    replication: {
      read: [
        {
          host: environments.HOST_SECONDARY,
          username: environments.USERNAME,
          password: environments.PASSWORD,
        },
      ],
      write: {
        host: environments.HOST,
        username: environments.USERNAME,
        password: environments.PASSWORD,
      },
    },
    dialect: 'postgres',
    logging: false,
  });
} else {
  sequelize = new Sequelize(environments.DATABASE, environments.USERNAME, environments.PASSWORD, {
    host: environments.HOST,
    port: Number(environments.PORT),
    dialect: 'postgres',
    logging: false,
  });
}

export { sequelize };
class DatabaseHandler {
  logger: LoggerService;

  constructor() {
    this.logger = new LoggerService('Database');
  }

  async connect(): Promise<any> {
    this.logger.info('***DB CONFIGS***');
    this.logger.info(environments);
    try {
      await sequelize.authenticate();
      this.logger.info('Database connection success');
      return sequelize;
    } catch (err) {
      this.logger.error(`Database connection error ${err}`);
      throw err;
    }
  }

  async init(): Promise<any> {
    try {
      Object.keys(Models).forEach(model => {
        const Model = (Models as any)[model];
        Model.initialize(sequelize);
      });
      this.logger.info('Initialized Models');
      return;
    } catch (err) {
      this.logger.error(`Error during model initialization ${err}`);
      throw err;
    }
  }

  async sync(options?: SyncOptions): Promise<any> {
    try {
      await sequelize.sync(options);
      this.logger.info('Database sync success');
      return;
    } catch (err) {
      this.logger.error(`Database sync erorr ${err}`);
      throw err;
    }
  }
}

const databaseHandler = new DatabaseHandler() as DatabaseHandler;

export default databaseHandler;
