const {
  BASE_URL,
  LOG_LEVEL = 'debug',
  HOST = '',
  HOST_SECONDARY = '',
  PORT,
  DATABASE = '',
  USERNAME = '',
  PASSWORD = '',
  REPLICATION,
} = process.env;

export type DBConfigSchema = {
  HOST: string;
  HOST_SECONDARY?: string;
  PORT: string | number;
  DATABASE: string;
  USERNAME: string;
  PASSWORD: string;
  REPLICATION?: string;
};

const environments = {
  BASE_URL,
  LOG_LEVEL,
  HOST,
  HOST_SECONDARY,
  PORT,
  DATABASE,
  USERNAME,
  PASSWORD,
  REPLICATION,
};

export default environments;
