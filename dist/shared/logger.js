'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorlogger = exports.logger = void 0;
const winston_1 = require('winston');
const path_1 = __importDefault(require('path'));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const winston_daily_rotate_file_1 = __importDefault(
  require('winston-daily-rotate-file')
);
// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${date.toDateString()}: ${hour}:${minutes}:${second} [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(label({ label: 'ph' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
exports.logger = logger;
const errorlogger = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(label({ label: 'ph' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
exports.errorlogger = errorlogger;
