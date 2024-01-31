const winston = require('winston');
const expressWinston = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const level = process.env.LOG_LEVEL || 'info';
const env = process.env.NODE_ENV || 'development';
const format = env === 'production'
    ? winston.format.json()
    : winston.format.simple();

const transports = [
    new winston.transports.Console(),
    new DailyRotateFile({ filename: 'logs/info/info.log', level: 'info' }),
    new DailyRotateFile({ filename: 'logs/error/error.log', level: 'error' }),
];

const infoLogger = winston.createLogger({ level, format, transports });
const errorLogger = winston.createLogger({ level: 'error', format, transports });

const infoLoggerMiddleware = expressWinston.logger({
    transports, format, meta: false, msg: 'HTTP {{req.method}} {{req.url}}', expressFormat: true, colorize: false,
});
const errorLoggerMiddleware = expressWinston.errorLogger({ transports, format });

module.exports = {
    infoLogger, errorLogger, infoLoggerMiddleware, errorLoggerMiddleware,
};
