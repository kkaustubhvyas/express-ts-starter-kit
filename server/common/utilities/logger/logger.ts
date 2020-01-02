const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const moment = require('moment');
const fs = require('fs');
const { format } = winston;
let logDir = `${require.main.id}/logs`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const consoleLogFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${(`${(label || '').toUpperCase()}`)}] ${moment().format("YYYY-MM-DD HH:MM:SS")} [${level}]: ${message}\n`;
});

const fileLogFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${(label || '').toUpperCase()}] ${moment().format("YYYY-MM-DD HH:MM:SS")}: [${level}]: ${message}\n`;
});

let options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    prettyPrint: true,
    format: format.combine(
      format.label({ label: 'APP' }),
      format.timestamp(),
      format.colorize(),
      format.simple(),
      consoleLogFormat
    )
  },
};

const fileTransport = {
  filename: `${require.main.id}/logs/app-%DATE%.log`,
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(
    format.label({ label: 'APP' }),
    format.timestamp(),
    format.simple(),
    fileLogFormat
  ),
};

const logger = new winston.createLogger({
  level: 'error',
  transports: [
    new DailyRotateFile(fileTransport),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

const httpModuleOptions = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    prettyPrint: true,
    format: format.combine(
      format.label({ label: 'HTTP' }),
      format.timestamp(),
      format.colorize(),
      format.simple(),
      consoleLogFormat
    )
  },
};

const httpModuleFileTransport = {
  filename: `${require.main.id}/logs/http-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(
    format.label({ label: 'HTTP' }),
    format.timestamp(),
    format.simple(),
    fileLogFormat
  ),
};

export const HttpModuleLogger = new winston.createLogger({
  level: 'error',
  transports: [
    new DailyRotateFile(httpModuleFileTransport),
    new winston.transports.Console(httpModuleOptions.console)
  ],
  exitOnError: false
});


export default logger;