import winston, { Logger as LoggerType } from 'winston';

import appConfig from '../config';

class ConsoleLogger {
  private readonly moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  silly(msg: string) {
    console.log(`${this.moduleName} SILLY `, msg);
  }

  debug(msg: string) {
    console.debug(`${this.moduleName} DEBUG `, msg);
  }

  info(msg: string) {
    console.info(`${this.moduleName} INFO `, msg);
  }

  error(msg: string) {
    console.error(`${this.moduleName} ERROR `, msg);
  }
}

class WinstonLogger {
  private readonly logger: LoggerType;

  constructor(moduleName: string) {
    this.logger = winston.createLogger({
      level: 'silly',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
              ({ timestamp, level, message }) =>
                `${timestamp} ${moduleName} ${level}: ${
                  typeof message === 'object'
                    ? JSON.stringify(message, null, 2)
                    : message
                }`,
            ),
          ),
        }),
      ],
    });
  }

  silly(msg: string) {
    this.logger.silly(msg);
  }

  debug(msg: string) {
    this.logger.debug(msg);
  }

  info(msg: string) {
    this.logger.info(msg);
  }

  error(msg: string) {
    this.logger.error(msg);
  }
}

const Logger = appConfig.stage === 'local' ? WinstonLogger : ConsoleLogger;

export { Logger };
