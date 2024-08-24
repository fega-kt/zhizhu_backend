import { utilities } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';

const fileRotateTransport = new DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  zippedArchive: true,
  level: 'info',
});

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.label(),
      winston.format.ms(),
      utilities.format.nestLike(process.env.APP_NAME, {
        colors: true,
        prettyPrint: true,
        processId: true,
        appName: true,
      }),
    ),
  }),
  fileRotateTransport,
];

export const winstonConfig = winston.createLogger({
  levels: winston.config.npm.levels, // Ensure debug level is included
  level: 'silly',
  transports,
});

export const winstonConfigMain = WinstonModule.createLogger({
  levels: winston.config.npm.levels, // Ensure correct level mapping
  transports,
});
