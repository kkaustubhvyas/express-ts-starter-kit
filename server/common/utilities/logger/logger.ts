/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { Logger } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import moment from 'moment';
import environments from '../../environments';

const { format } = winston;

const consoleLogFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${`${(label || '').toUpperCase()}`}] ${moment(timestamp).format(
    'YYYY-MM-DD HH:MM:SS',
  )} [${level}]: ${message}\n`;
});

class LoggerService {
  private logger: Logger;

  constructor(label: string) {
    const options: ConsoleTransportOptions = {
      level: environments.LOG_LEVEL || 'debug',
      handleExceptions: true,
      format: format.combine(
        format.label({ label }),
        format.timestamp(),
        format.colorize(),
        format.simple(),
        consoleLogFormat,
      ),
    };

    this.logger = winston.createLogger({
      level: 'error',
      transports: [new winston.transports.Console(options)],
      exitOnError: false,
    });
  }

  log(level: string, message: string, ...meta: any[]) {
    this.logger.log(level, message, ...meta);
  }

  info(message: any, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }
}

export default LoggerService;
